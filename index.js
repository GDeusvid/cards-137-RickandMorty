import express from "express";
import axios from "axios";
import bodyParser from "body-parser";


const app = express();
const port = 3100;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
var pagecount=1;
app.get("/", async (req,res)=>{
    pagecount=1;
    try{
        const result = await axios.get("https://rickandmortyapi.com/api/character/?page=1");
        const dados=result.data.results;
        
        const newdados = await exibirpersonagens(dados,pagecount);
        
        
        res.render("index.ejs", { newdados: newdados });
    }catch (error) {
    
    res.status(500);
  }
});

app.post("/get-name", async (req,res)=>{
    
    var searchdata=req.body;
    const newdados = await verificanome(searchdata,allnames);
    
    res.render("index.ejs", { newdados: newdados });
});

app.get("/next", async (req,res)=>{
    pagecount++;
    
    try{
        const result = await axios.get(`https://rickandmortyapi.com/api/character/?page=${pagecount}`);
        const dados=result.data.results;
        
        const newdados = await exibirpersonagens(dados,pagecount);
        
        
        res.render("index.ejs", { newdados: newdados });
    }catch (error) {
    
    res.status(500);
  }
});
app.get("/back", async (req,res)=>{
    pagecount--;
    
    try{
        const result = await axios.get(`https://rickandmortyapi.com/api/character/?page=${pagecount}`);
        const dados=result.data.results;
        
        const newdados = await exibirpersonagens(dados,pagecount);
        
        
        res.render("index.ejs", { newdados: newdados });
    }catch (error) {
    
    res.status(500);
  }
});












app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });



// ------------------------------------- interação
function exibirpersonagens(dados,pagecount){
    var dadosnapagina=dados.length;
    var image=[];
    var names=[];
    var status=[];
    var specie=[];
    var type = [];
    var gender = [];
    var location = [];
    for(var i=0; i < dados.length;i++){
        image.push(dados[i].image)
        names.push(dados[i].name);
        status.push(dados[i].status);
        specie.push(dados[i].species);
        type.push(dados[i].type);
        gender.push(dados[i].gender);
        location.push(dados[i].location.name);
    }
    var newdados={
        image:image,
        names:names,
        status:status,
        specie:specie,
        type:type,
        gender:gender,
        location:location,
        dadosnapagina:dadosnapagina,
        pagecount:pagecount

    };
    
    return newdados
}
async function verificanome(searchdata,allnames){
    // const resultado = allnames.filter(nome => nome.toLowerCase().includes(searchdata.toLowerCase()));
    const posicoesEncontradas = [];
    const searchLowerCase = String(searchdata.name).toLowerCase();
    
    allnames.forEach((nome, indice) => {
        if (String(nome).toLowerCase().includes(searchLowerCase)) {
            posicoesEncontradas.push(indice);
    }
    });
    console.log(posicoesEncontradas);

    var dadosnapagina=0;
    var pagecount=0;
    var image=[];
    var names=[];
    var status=[];
    var specie=[];
    var type = [];
    var gender = [];
    var location = [];


    for (var i=0;i<posicoesEncontradas.length;i++){
        const result = await axios.get(`https://rickandmortyapi.com/api/character/${posicoesEncontradas[i]+1}`);
        const dados=result.data;
        
        image.push(dados.image)
        names.push(dados.name);
        status.push(dados.status);
        specie.push(dados.species);
        type.push(dados.type);
        gender.push(dados.gender);
        location.push(dados.location.name);
    }
    
    
    
    
        
    
    var newdados={
        image:image,
        names:names,
        status:status,
        specie:specie,
        type:type,
        gender:gender,
        location:location,
        dadosnapagina:dadosnapagina,
        pagecount:pagecount

    };
    console.log(newdados);
    return newdados
}

var allnames=["Rick Sanchez", "Morty Smith", "Summer Smith", "Beth Smith", "Jerry Smith", "Abadango Cluster Princess", "Abradolf Lincler", "Adjudicator Rick", "Agency Director", "Alan Rails", "Albert Einstein", "Alexander", "Alien Googah", "Alien Morty", "Alien Rick", "Amish Cyborg", "Annie", "Antenna Morty", "Antenna Rick", "Ants in my Eyes Johnson", "Aqua Morty", "Aqua Rick", "Arcade Alien", "Armagheadon", "Armothy", "Arthricia", "Artist Morty", "Attila Starwar", "Baby Legs", "Baby Poopybutthole", "Baby Wizard", "Bearded Lady", "Beebo", "Benjamin", "Bepisian", "Beta-Seven", "Beth Sanchez", "Beth Smith", "Beth Smith", "Beth's Mytholog", "Big Boobed Waitress", "Big Head Morty", "Big Morty", "Body Guard Morty", "Bill", "Bill", "Birdperson", "Black Rick", "Blamph", "Blim Blam", "Blue Diplomat", "Blue Footprint Guy", "Blue Shirt Morty", "Bobby Moynihan", "Boobloosian", "Bootleg Portal Chemist Rick", "Borpocian", "Brad", "Brad Anderson", "Calypso", "Campaign Manager Morty", "Canklanker Thom", "Centaur", "Chris", "Chris", "Coach Feratu (Balik Alistane)", "Collector", "Colossus", "Commander Rick", "Concerto", "Conroy", "Cool Rick", "Cop Morty", "Cop Rick", "Courier Flap", "Cousin Nicky", "Cowboy Morty", "Cowboy Rick", "Crab Spider", "Creepy Little Girl", "Crocubot", "Cronenberg Rick", "Cronenberg Morty", "Cult Leader Morty", "Cyclops Morty", "Cyclops Rick", "Cynthia", "Cynthia", "Dale", "Daron Jefferson", "David Letterman", "Davin", "Diablo Verde", "Diane Sanchez", "Dipper and Mabel Mortys", "Tuberculosis", "Gonorrhea", "Hepatitis A", "Hepatitis C", "Bubonic Plague", "E. Coli", "Donna Gueterman", "Doofus Rick", "Doom-Nomitron", "Dr. Glip-Glop", "Dr. Schmidt", "Dr. Wong", "Dr. Xenon Bloom", "Duck With Muscles", "Eli", "Eli's Girlfriend", "Eric McMan", "Eric Stoltz Mask Morty", "Ethan", "Ethan", "Evil Beth Clone", "Evil Jerry Clone", "Evil Morty", "Evil Rick", "Evil Summer Clone", "Eyehole Man", "Fart", "Fat Morty", "Father Bob", "Flansian", "Fleeb", "Frank Palicky", "Frankenstein's Monster", "Fulgora", "Galactic Federation President", "Gar Gloonch", "Gar's Mytholog", "Garblovian", "Garmanarnar", "Garment District Rick", "Gazorpazorpfield", "Gene", "General Nathan", "General Store Owner", "Genital Washer", "Ghost in a Jar", "Gibble Snake", "Glasses Morty", "Glenn", "Glenn", "Glexo Slim Slom", "Gobo", "Goddess Beth", "Gordon Lunas", "Cornvelious Daniel", "Gwendolyn", "Hammerhead Morty", "Hamster In Butt", "Hamurai", "Harold", "Hemorrhage", "Hole in the Wall Where the Men Can See it All", "Hookah Alien", "Hunter", "Hunter's Father", "Hydrogen-F", "Ice-T", "Ideal Jerry", "Insurance Rick", "Investigator Rick", "Invisi-trooper", "Izzy", "Jackie", "Jacob", "Jacqueline", "Jaguar", "Jamey", "Jan-Michael Vincent", "Jerry 5-126", "Jerry Smith", "Celebrity Jerry", "Jerry Smith", "Jerry's Mytholog", "Jessica", "Jessica", "Jessica's Friend", "Jim", "Johnny Depp", "Jon", "Joseph Eli Lipkip", "Joyce Smith", "Juggling Rick", "Karen Entity", "Katarina", "Keara", "Kevin", "King Flippy Nips", "King Jellybean", "Kozbian", "Kristen Stewart", "Krombopulos Michael", "Kyle", "Lady Katana", "Larva Alien", "Lawyer Morty", "Leonard Smith", "Lighthouse Keeper", "Lil B", "Lisa", "Little Dipper", "Lizard Morty", "Loggins", "Logic", "Long Sleeved Morty", "Lucy", "Ma-Sha", "Magma-Q", "Magnesium-J", "Man Painted Silver Who Makes Robot Noises", "Maximums Rickimus", "MC Haps", "Mechanical Morty", "Mechanical Rick", "Mechanical Summer", "Mega Fruit Farmer Rick", "Melissa", "Michael Denny and the Denny Singers", "Michael Jenkins", "Michael McLick", "Michael Thompson", "Million Ants", "Mitch", "Mohawk Guy", "Morty Mart Manager Morty", "Morty Jr.", "Morty Rick", "Morty Smith", "Morty K-22", "Morty Smith", "Mortytown Loco", "Mr. Beauregard", "Mr. Benson", "Mr. Booby Buyer", "Mr. Goldenfold", "Mr. Goldenfold", "Mr. Marklovitz", "Mr. Meeseeks", "Mr. Needful", "Mr. Poopybutthole", "Mrs. Lipkip", "Mrs. Pancakes", "Amy Poopybutthole", "Mrs. Refrigerator", "Mrs. Sanchez", "Mrs. Sullivan", "Nancy", "Noob-Noob", "Numbericon", "Octopus Man", "Orthodox Jew", "Pat Gueterman", "Paul Fleishman", "Pawnshop Clerk", "Pencilvester", "Phillip Jacobs", "Photography Cyborg", "Photography Raptor", "Pibbles Bodyguard", "Pichael Thompson", "Pickle Rick", "Piece of Toast", "Plumber Rick", "Poncho", "Presidentress of The Mega Gargantuans", "Prince Nebulon", "Principal Vagina", "Principal Vagina", "Purge Planet Ruler", "Quantum Rick", "Randy Dicknose", "Rat Boss", "Real Fake Doors Salesman", "Regional Manager Rick", "Regular Legs", "Reverse Giraffe", "Reverse Rick Outrage", "Revolio Clockberg Jr.", "Rick D. Sanchez III", "Rick Guilt Rick", "Rick Prime", "Rick D-99", "Rick D716", "Rick D716-B", "Rick D716-C", "Rick Sanchez", "Rick J-22", "Rick K-22", "Rick Sanchez", "Ricktiminus Sancheziminius", "Riq IV", "Risotto Groupon", "Risotto's Tentacled Henchman", "Robot Morty", "Robot Rick", "Roger", "Ron Benson", "Ruben", "Samantha", "Scary Brandon", "Scary Glenn", "Scary Terry", "Scroopy Noopers", "Scropon", "Scrotian", "Self-Congratulatory Jerry", "Shimshamian", "Shlaammi", "Shleemypants", "Shmlamantha Shmlicelli", "Shmlangela Shmlobinson-Shmlower", "Shmlona Shmlobinson", "Shmlonathan Shmlower", "Shmlony Shmlicelli", "Shmooglite Runner", "Shnoopy Bloopers", "Shrimply Pibbles", "Simple Rick", "Slaveowner", "Sleepy Gary", "Slick Morty", "Slippery Stair", "Slow Mobius", "Slow Rick", "Snuffles (Snowball)", "Solicitor Rick", "Squanchy", "Stacy", "Stair Goblin", "Stealy", "Steve", "Steven Phillips", "Stu", "Summer Smith", "Summer Smith", "Supernova", "Taddy Mason", "Taint Washer", "Tammy Guetermann", "Tammy Guetermann", "Teacher Rick", "Terry", "President Curtis", "The President of the Miniverse", "The Scientist Formerly Known as Rick", "Thomas Lipkip", "Three Unknown Things", "Tinkles", "Tiny Rick", "Toby Matthews", "Todd Crystal", "Tom Randolph", "Tommy's Clone", "Tophat Jones", "Tortured Morty", "Toxic Morty", "Toxic Rick", "Traflorkian", "Trandor", "Tree Person", "Tricia Lange", "Trunk Morty", "Trunk Man", "Truth Tortoise", "Tusked Assassin", "Two Guys with Handlebar Mustaches", "Tumblorkian", "Unity", "Unmuscular Michael", "Vampire Master", "Vance Maximus", "Veronica Ann Bennet", "Voltematron", "Wall Crawling Rick", "Wedding Bartender", "Unknown Rick", "Woman Rick", "Worldender", "Yaarb", "Yellow Headed Doctor", "Yellow Shirt Rick", "Zarbadar Gloonch", "Zarbadar's Mytholog", "Zeep Xanflorp", "Zeta Alpha Rick", "Zick Zack", "Uncle Steve", "Bearded Morty", "Roy", "Davin", "Greebybobe", "Scary Teacher", "Fido", "Accountant dog", "Tiny-persons advocacy group lawyer", "Giant Judge", "Morty Jr's interviewer", "Guy from The Bachelor", "Corn detective", "Michael Jackson", "Trunkphobic suspenders guy", "Spiderweb teddy bear", "Regular Tyrion Lannister", "Quick Mystery Presenter", "Mr. Sneezy", "Two Brothers", "Alien Mexican Armada", "Giant Cat Monster", "Old Women", "Trunkphobic guy", "Pro trunk people marriage guy", "Muscular Mannie", "Baby Legs Chief", "Mrs. Sullivan's Boyfriend", "Plutonian Hostess", "Plutonian Host", "Rich Plutonian", "Rich Plutonian", "Synthetic Laser Eels", "Pizza-person", "Pizza-person", "Greasy Grandma", "Phone-person", "Phone-person", "Chair-person", "Chair-person", "Chair-homeless", "Chair-waiter", "Doopidoo", "Super Weird Rick", "Pripudlian", "Giant Testicle Monster", "Michael", "Michael's Lawyer", "Veterinary", "Veterinary Nurse", "Bearded Jerry", "Shaved Head Jerry", "Tank Top Jerry", "Pink Polo Shirt Jerry", "Jerryboree Keeper", "Jerryboree Receptionist", "Anchor Gear", "Gear Cop", "Roy's Mum", "Roy's Wife", "Roy's Son", "Simon", "Vampire Master's Assistant", "Arbolian Mentirososian", "St. Gloopy Noops Nurse", "Nano Doctor", "Funny Songs Presenter", "Tax Attorney", "Butthole Ice Cream Guy", "Traflorkian Journalist", "Communication's Responsible Rick", "Teleportation's Responsible Rick", "SEAL Team Rick", "SEAL Team Rick", "SEAL Team Rick", "SEAL Team Rick", "Morphizer-XE Customer Support", "Morphizer-XE Customer Support", "Morphizer-XE Customer Support", "Alien Spa Employee", "Little Voltron", "Baby Rick", "Bartender Morty", "Dancer Cowboy Morty", "Dancer Morty", "Flower Morty", "Hairdresser Rick", "Journalist Rick", "Private Sector Rick", "Purple Morty", "Retired General Rick", "Secret Service Rick", "Steve Jobs Rick", "Sheik Rick", "Modern Rick", "Tan Rick", "Visor Rick", "Colonial Rick", "P-Coat Rick", "Chang", "Dr. Eleanor Arroway", "Varrix", "Secretary of the Interior", "Crystal Poacher", "Crystal Poacher", "Crystal Poacher", "Hologram Rick", "Fascist Rick", "Fascist Morty", "Fascist Mr. President", "Fascist Rick’s Clone", "Revolio Clockberg Jr.", "Fascist Shrimp Rick", "Fascist Shrimp Rick’s Clone", "Fascist Shrimp Morty", "Fascist Shrimp SS", "Fascist Teddy Bear Rick", "Fascist Teddy Bear Rick’s Clone", "Bully", "Anchorman", "Anchorwoman", "Morty’s Lawyer", "Judge", "Public Opinion Judge", "Caterpillar Mr. Goldenfold", "Wasp Rick", "Wasp Rick’s Clone", "Wasp Morty", "Wasp Summer", "Wasp Jerry", "Wasp Beth", "Caterpillar Mr. Goldenfold’s Larvae", "Boglin", "Kirkland Brand Mr. Meeseeks", "Glootie", "Danny Publitz", "Mothership Intern", "Monogatron Leader", "Lizard", "Deliverance", "Tony", "Tony’s Wife", "Monogatron Queen", "Tony's Dad", "Jeff", "Josiah", "Maggie", "Priest Witherspoon", "Richard", "Running Bird", "Secretary at Tony's", "Mountain Sweat Jerry", "Vermigurber", "Miles Knightly", "Heist-Con Receptionist", "Angie Flint", "Glar", "Truckula", "Snake Arms", "Double Microwawe", "Monitor Lord", "Key Catcher", "The Shapeshiftress", "Heistotron", "Randotron", "Hephaestus", "Ventriloquiver", "Elon Tusk", "Gramuflackian Anchorman", "Gramuflackian General", "Netflix Executive", "Balthromaw", "The Wizard", "Talking Cat", "Debrah", "Debrah’s Partner", "Michael", "Slut Dragon", "Shadow Jacker", "Chachi", "Slippy", "Robot Snake", "Snake Hitler", "Snake Lincoln", "Snake Resistance Robot", "Snake Linguist", "Snake Terminator", "Snake Soldier", "Snake with Legs", "Secret Service Snake", "Anchosnake", "Anchosnake", "80's snake", "Bar Customer", "Bartender", "PC Basketball Player", "Cavesnake", "Pet Shop Employee", "Snake Reporter", "High Pilot", "High Pilot", "Phoenixperson", "Tickets Please Guy", "Floaty Bloody Man", "Floaty Non-Gasm Brotherhood Member", "Floaty Non-Gasm Brotherhood Member Friend", "Abradolf Lincler", "Biblesaurus", "Birdperson", "Cats Fan", "Christmas Storyteller", "Cookies Guy", "Crossy", "Female Scorpion", "Floaty Bloody Man’s Daughter", "Goomby", "Hairspray Fan", "Jesus Christ", "Josh", "Josh's Sister", "Leah", "Marcus", "Mike Johnson", "Mr. Celery & Friends", "Musical Fan", "Phantom of the Opera Fan", "Phoenixperson", "Private Smith", "Professor Sanchez", "Ramamama Lord", "Ruth Bader Ginsburg", "Sarge", "Shrek The Musical Fan", "Snuffles", "Storylord", "Tammy Guetermann", "The Concept of Time", "Beth Smith", "Summer Smith", "Morty Smith", "Rick Sanchez", "Train Cop", "Train Cops", "Train Cops Instructor", "Darth Poopybutthole", "Evil Morty", "Morty’s Disguise", "Rick’s Disguise", "Uncle Nibbles", "Angry Glorzo", "Bruce", "Council of Glorzos Member", "Council of Glorzos Member", "Old Glorzo", "Shane", "Steve", "Troy", "Crystal Dealers Boss", "Crystal Dealer", "Crystal Dealer", "Crystal Dealer", "SWAT Officer", "Plane Crash Survivor", "Plane Crash Survivor", "Heroine Keith", "Impervious to Acid SWAT Officer", "Johnny Carson", "Sonia Sotomayor", "Morty’s Father-in-law", "Morty’s Mother-in-law", "Morty’s Girlfriend", "Gaia", "Reggie", "Ticktock", "Florflock", "Squeeb", "Defiance Beth", "Defiance Squanchette", "Defiance Doctor", "New Improved Galactic Federation Guard", "New Improved Galactic Federation Guard", "Mr. Nimbus", "Hoovy", "Bova", "Japheth", "Japheth's Middle Son", "Japheth's Eldest Son", "Japheth's Youngest Son", "Japheth's Grandson", "Adam", "Adam's Mother", "Warlock", "Evolved Narnian", "Mr. Nimbus Secretary", "Evolved Narnian Disguised as Morty", "Mr. Nimbus' Squid", "Scarecrow Rick", "Scarecrow Summer", "Scarecrow Jerry", "Scarecrow Morty", "Scarecrow Beth", "Glockenspiel Jerry", "Glockenspiel Beth", "Glockenspiel Rick", "Glockenspiel Summer", "Glockenspiel Morty", "Wicker Beth", "Wicker Rick", "Wicker Morty", "Wicker Summer", "Metal Rick", "Gun Brain Rick", "Mr. Always Wants to be Hunted", "Squid Costume Beth", "Squid Costume Jerry", "Squid Costume Morty", "Squid Costume Rick", "Squid Costume Summer", "Dracula", "Steve", "When Wolf", "Too Cute to Murder Beth", "Too Cute to Murder Rick", "Too Cute to Murder Jerry", "Too Cute to Murder Morty", "Too Cute to Murder Summer", "Planetina", "Daphne", "Diesel Weasel", "Eddie", "Xing Ho", "Air Tina-Teer", "Water Tina-Teer", "Planetina Buyer", "Tony Galopagus", "Sticky", "Professor Shabooboo", "Sperm Queen", "CHUD King", "Princess Ponietta", "Naruto Smith", "Blazen", "Kathy Ireland", "Amazing Johnathan", "Foal Sanchez", "Spaceman", "Cirque du Soleil Zumanity Member", "Cirque du Soleil Zumanity Member", "Cirque du Soleil Zumanity Member", "Cirque du Soleil Zumanity Member", "Cirque du Soleil Zumanity Member", "Bruce Chutback", "Alyson Hannigan", "Cenobite", "Cenobite", "Cenobite", "Cenobite", "Cenobite", "Coat Rack Head", "Mousetrap Nipples", "Changeformer", "Changeformer", "Space Cruiser", "Coop", "Dwayne", "Franklin D. Roosevelt", "President's General", "Giant Assassin Hidden in the Statue of Liberty", "Turkey Morty", "Turkey Rick", "Turkey President Curtis", "Martínez", "Marvin", "Jackey", "Native Alien", "Pilgrim Alien", "President Turkey", "Mary-Lou", "Big Fat rick", "Hothead Rick", "Ricardo Montoya", "Wrap-it-up Little Rick", "Yo-yo Rick", "Voiceoverian", "Voiceoverian", "Gotron Pilot", "Gotron Pilot", "Gotron Pilot", "Young Memory Rick", "Memory Tammy", "Rick's Garage", "Memory Squanchy", "Memory Rick", "Memory Rick", "Memory Geardude", "Birdperson & Tammy's Child", "Two Crows", "Mr. Cookie President", "Nick", "Harold (Garbage Goober)", "Harold's Wife", "Alien Crow", "Alien Crow", "Samansky", "Palicki", "Sarge", "Slartivartian", "Ferkusian", "Morglutzian", "Super Turkey", "7+7 Years Old Morty", "26 Years Old Morty", "40 Years Old Morty", "Andy", "Baby Mouse Skin Morty", "Metaphor for Capitalism", "Beth Sanchez", "Crow Scare", "Pussifer", "Stan Lee Rick", "Re-Build-a-Morty Morty", "Deformed Morty", "Crow Horse", "Bald Rick", "Punk Rick", "Party Rick", "Scar Rick", "Long Hair Rick", "Redhead Rick", "Redhead Morty", "Gotron", "Young Jerry", "Young Beth", "Young Beth", "Young Jerry", "Butter Robot"];
