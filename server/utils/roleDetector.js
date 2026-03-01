function detectRole(skills){

    const roleMap = {
        "Software Developer": [
            "react","node","java","python","javascript","html","css","git","express"
        ],
        "Data Scientist": [
            "python","machine learning","pandas","numpy","statistics","data analysis"
        ],
        "Cloud Engineer": [
            "aws","docker","kubernetes","devops"
        ],
        "Backend Developer": [
            "node","java","python","mysql","mongodb","express"
        ],
        "Frontend Developer": [
            "react","html","css","javascript"
        ]
    };

    let bestRole = "Software Developer";
    let maxMatch = 0;

    for(let role in roleMap){
        const matchCount = roleMap[role].filter(skill => skills.includes(skill)).length;

        if(matchCount > maxMatch){
            maxMatch = matchCount;
            bestRole = role;
        }
    }

    return bestRole;
}

module.exports = detectRole;