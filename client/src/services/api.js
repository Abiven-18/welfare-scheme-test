import { supabase } from '../lib/supabase';

// Helper function to transform Supabase data to frontend format
const transformScheme = (scheme) => {
  // Parse tags - they might be a string with commas or newlines
  let tagsArray = [];
  if (scheme.Tags) {
    if (Array.isArray(scheme.Tags)) {
      tagsArray = scheme.Tags;
    } else if (typeof scheme.Tags === 'string') {
      // Split by comma or newline and clean up
      tagsArray = scheme.Tags
        .split(/[,\n]+/)
        .map(tag => tag.trim())
        .filter(tag => tag.length > 0);
    }
  }

  return {
    id: scheme.id,
    title: scheme.Scheme_name || scheme.Scheme_rename || 'Untitled',
    description: scheme.Brief || '',
    ministry: scheme.Ministry || '',
    year: scheme.Year_Launched || '',
    primeMinister: scheme.Prime_Minister || '',
    theme: scheme.Classification || '',
    beneficiaries: scheme.Target_Population || '',
    tags: tagsArray,
    officialWebsite: scheme['Official _website_link'] || '',
    documentUrl: scheme.document_url || null,
    // Keep original scheme name for "previous name" logic
    schemeName: scheme.Scheme_name || '',
    schemeRename: scheme.Scheme_rename || ''
  };
};

// Schemes API
export const getSchemes = async (params = {}) => {
  let query = supabase.from('schemes').select('*', { count: 'exact' });
  
  // Apply filters using actual column names
  if (params.year) {
    query = query.ilike('Year_Launched', `%${params.year}%`);
  }
  if (params.ministry) {
    // Use ilike for case-insensitive partial match to handle variations
    query = query.ilike('Ministry', `%${params.ministry}%`);
  }
  if (params.theme) {
    query = query.ilike('Classification', `%${params.theme}%`);
  }
  if (params.primeMinister) {
    query = query.eq('Prime_Minister', params.primeMinister);
  }
  if (params.search) {
    query = query.or(`Scheme_name.ilike.%${params.search}%,Scheme_rename.ilike.%${params.search}%,Brief.ilike.%${params.search}%`);
  }
  
  // Pagination
  const page = parseInt(params.page) || 1;
  const limit = parseInt(params.limit) || 10;
  const from = (page - 1) * limit;
  const to = from + limit - 1;
  
  query = query.range(from, to);
  
  const { data, error, count } = await query;
  
  if (error) {
    console.error('Supabase error:', error);
    throw error;
  }
  
  // Transform data to match frontend expectations
  const transformedSchemes = (data || []).map(transformScheme);
  
  // Return in the format HomePage expects
  return {
    schemes: transformedSchemes,
    currentPage: page,
    totalPages: Math.ceil((count || 0) / limit),
    totalSchemes: count || 0
  };
};

export const getSchemeById = async (id) => {
  const { data, error } = await supabase
    .from('schemes')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) {
    console.error('Supabase error:', error);
    throw error;
  }
  
  // Transform and return
  return transformScheme(data);
};

export const getFilterOptions = async () => {
  // Get unique values for filters using actual column names
  const { data: schemes, error } = await supabase
    .from('schemes')
    .select('Year_Launched, Ministry, Classification, Prime_Minister');
  
  if (error) {
    console.error('Supabase error:', error);
    throw error;
  }
  
  const safeSchemes = schemes || [];
  
  // Extract years from Year_Launched (which might be like "1966-67" or "1995")
  const years = [...new Set(
    safeSchemes
      .map(s => s.Year_Launched)
      .filter(Boolean)
      .map(y => y.toString().match(/\d{4}/)?.[0]) // Extract first 4-digit year
      .filter(Boolean)
  )].sort((a, b) => b - a);
  
  const ministries = [...new Set(safeSchemes.map(s => s.Ministry).filter(Boolean))].sort();
  
  // Split themes by semicolon AND comma, then normalize to remove duplicates
  const allThemes = safeSchemes
    .map(s => s.Classification)
    .filter(Boolean)
    .flatMap(classification => 
      // Split by both semicolon and comma
      classification.split(/[;,]/).map(theme => theme.trim())
    )
    .filter(theme => theme.length > 0);
  
  // Create a map to track normalized themes
  const themeMap = new Map();
  
  allThemes.forEach(theme => {
    // Normalize: lowercase for comparison
    const normalized = theme.toLowerCase().trim();
    
    // If we haven't seen this normalized version, add it with proper title case
    if (!themeMap.has(normalized)) {
      // Convert to proper title case
      const titleCase = normalized
        .split(' ')
        .map((word, index) => {
          // Keep small words lowercase unless they're the first word
          const smallWords = ['and', 'or', 'of', 'the', 'in', 'on', 'at', 'to', 'for', 'a', 'an'];
          if (index === 0 || !smallWords.includes(word)) {
            return word.charAt(0).toUpperCase() + word.slice(1);
          }
          return word;
        })
        .join(' ');
      
      themeMap.set(normalized, titleCase);
    }
  });
  
  const themes = Array.from(themeMap.values()).sort();
  
  const primeMinisters = [...new Set(safeSchemes.map(s => s.Prime_Minister).filter(Boolean))].sort();
  
  // Return in the format FilterContext expects
  return {
    years,
    ministries,
    themes,
    primeMinisters
  };
};

export const downloadSchemeDocument = async (id) => {
  const scheme = await getSchemeById(id);
  if (scheme && scheme.documentUrl) {
    // Open PDF in new tab
    window.open(scheme.documentUrl, '_blank');
  } else {
    console.error('No document URL found for this scheme');
  }
};

// Feedback API
export const submitFeedback = async (feedbackData) => {
  const { data, error } = await supabase
    .from('feedback')
    .insert([{
      email: feedbackData.email,
      message: feedbackData.message,
      status: 'pending'
    }])
    .select();
  
  if (error) {
    console.error('Supabase error:', error);
    throw error;
  }
  
  return data;
};

export default { getSchemes, getSchemeById, getFilterOptions, downloadSchemeDocument, submitFeedback };
