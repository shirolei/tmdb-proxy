const axios = require('axios');

const TMDB_API_KEY = process.env.TMDB_API_KEY;
const TMDB_BASE_URL = 'https://api.themoviedb.org';

module.exports = async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    if (!TMDB_API_KEY) {
        return res.status(500).json({ error: 'TMDB_API_KEY not configured' });
    }

    try {
        const tmdbPath = req.query.tmdb_path || '';
        const params = { ...req.query, api_key: TMDB_API_KEY };
        delete params.tmdb_path;

        const tmdbUrl = `${TMDB_BASE_URL}/${tmdbPath}`;
        const response = await axios.get(tmdbUrl, { params });

        res.status(response.status).json(response.data);
    } catch (error) {
        console.error('Proxy error:', error.message);
        res.status(error.response?.status || 500).json({
            error: error.message
        });
    }
};
