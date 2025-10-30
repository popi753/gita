exports.randomFact = async (req,
    res)=>{
    const randomFact = [ 
        "The first computer programmer was Ada Lovelace, who wrote the first algorithm in 1843.",
        "The first computer mouse was made of wood in the 1960s.",
        "The first computer virus was created in 1983 and was called 'Elk Cloner'.",
        "The term 'bug' in computing came from an actual moth that was found in Harvard's Mark II computer in 1947.",
        "The first website went live on August 6, 1991.",
        "JavaScript was created in just 10 days by Brendan Eich in 1995.",
        "The first email was sent by Ray Tomlinson in 1971 to himself.",
        "The USB symbol is based on Neptune's trident, representing power and connectivity.",
        "The first computer hard disk was introduced by IBM in 1956 and could store 5MB of data.",
        "The @ symbol used in email addresses is called an 'amphora' in Danish and 'monkey tail' in Dutch."];
        
    const fact = randomFact[Math.floor(Math.random() * randomFact.length)];
    res.status(200).json({ fact });
};