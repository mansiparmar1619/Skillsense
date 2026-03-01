const pool = require('./db');

// Check if resume already exists
async function getExistingResume(resumeText) {
    const query = `
        SELECT id, embedding
        FROM resumes
        WHERE resume_text = $1
        LIMIT 1
    `;
    const result = await pool.query(query, [resumeText]);
    return result.rows[0];
}

// Store new resume
async function storeResume(resumeText, skills, embedding) {
    const query = `
        INSERT INTO resumes (resume_text, skills, embedding)
        VALUES ($1, $2, $3)
        RETURNING id
    `;

    const values = [
        resumeText,
        JSON.stringify(skills),
        JSON.stringify(embedding)
    ];

    const result = await pool.query(query, values);
    return result.rows[0];
}

module.exports = {
    getExistingResume,
    storeResume
};