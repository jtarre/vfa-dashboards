var express = require('express');
var router = express.Router();
var jsforce = require('jsforce');

/* GET home page. */
router.get('/', function(req, res, next) {
	console.log('get the home page!');
  var conn = new jsforce.Connection({
    // you can change loginUrl to connect to sandbox or prerelease env.
    loginUrl : 'https://login.salesforce.com/',
    clientSecret: '4767192206007523209', 
    redirectUri: 'http://localhost:3000/oauth/_callback',
    clientId: '3MVG9rFJvQRVOvk6KGm7WX.DOBEBOr701sDMIfbMTc24Y9Dzy2lVHwadn.FsVxVXXWhL5s7Jje0tS063s_gQV',
    instanceUrl: 'https://na14.salesforce.com'
  });
  conn.login("jason@ventureforamerica.org", "1010Boobooboo!!", function(err, userInfo) {
    if (err) { 
        console.error(err); 
        res.send('indux',
        {
            result : "Unsuccessful Salesforce connection. Don't worry. Refresh page!"
        })}
    res.render('index', 
      { 
      title      : 'Fellow Dashboard', 
      //results    : companyRecord, 
      //jobHistory : jobHistoryRecord,
      vfaList    : vfaList,
      fellowList : fellowList 
    });  
  });

  var vfaList = 
  { 
    ""            : "",
    "Amy Nelson"  : "005d0000001QfTE",  
    "Andrew Yang"  :  "005d0000001OKLG",  
    "Barrie Grinberg"  :  "005d0000003h7Sp",  
    "Cathlin Olszewski"  :  "005d00000031mtf",  
    "Connor Schake"  :  "005d0000004czLN",  
    "Eileen Lee"  : "005d0000001OKLf",  
    "Elisabeth Deogracias"  : "005d0000001Nsrm",  
    "Eric Caballero"  : "005d00000031CfS",  
    "Fabio DeSousa"  :  "005d0000004HJPG",  
    "Hannah Steinhardt"  :  "005d0000004czLI",  
    "Isa Ballard"  :  "005d00000031mtk",  
    "Jackie Miller"  :  "005d0000001O6g0",  
    "Jason Tarre"  :  "005d0000001OzTa",  
    "Joe Guy"  :  "005d0000002h82C",  
    "Katie Bloom"  :  "005d00000048Li7",  
    "Laila Selim"  :  "005d00000033SpB",  
    "Lauren Gill"  :  "005d0000001OKMY",  
    "Lauren Kahn"  :  "005d0000003gu2P",  
    "Leandra Elberger"  : "005d0000002hE6F",  
    "Mandy Marcus"  : "005d0000004e7gk",  
    "Megan Hurlburt"  : "005d0000001OKMT",  
    "Mike Tarullo"  : "005d0000001OKLz",  
    "Mike Henrich"  : "005d0000004KHDY",  
    "Rachel Greenspan"  : "005d0000004HrpD",  
    "Seonhye Moon"  : "005d0000001OKMd",  
    "Shira Sacks"  :  "005d0000004eY8B",  
    "Splash Admin"  : "005d0000003gMhs",  
    "Taylor Davidson"  :  "005d0000004IjzW",  
    "Tom Griffin"  :  "005d00000045mKQ",  
    "Victor Bartash"  : "005d0000004KHDd",  
    "Will Geary"  : "005d00000048iYF" };

  var fellowList = 
  { 
    ""                   : "",
    "2013 Adam Joseph"   :  "003d000000wj9QT",  
    "2013 Adam rhoades-brown"   : "003d000001AfvPd",  
    "2013 Alex Persky-Stern"   :  "003d000000wj9QV",  
    "2013 Alex Rawitz"   :  "003d000001AfvPe",  
    "2013 Alex Bea"   : "003d000000xBDHL",  
    "2013 Alexandra Snedeker"   : "003d000001AfvPf",  
    "2013 Ali Sheppard"   : "003d000001AfvPg",  
    "2013 Alli Shea"   :  "003d0000019ET7F",  
    "2013 Andrew Jankowski"   : "003d000001AfvPh",  
    "2013 Anh-ton Tran"   : "003d000001AfvPi",  
    "2013 Astrid Schanz-Garbassi"   : "003d000000wj9QO",  
    "2013 Avery Houser"   : "003d000000wj9Qe",  
    "2013 Brennan Crispin"   :  "003d000000wj9Qm",  
    "2013 Brian Feldman"   :  "003d000001AfvPl",  
    "2013 Charlie Mohn"   : "003d000001AfvPm",  
    "2013 Chelsea Amsley"   : "003d000001Wc8ht",  
    "2013 Chris Cruz-Guzman"   :  "003d000000wj9QS",  
    "2013 Chris Hikel"   :  "003d000000wj9Qy",  
    "2013 Claire Kim"   : "003d000001AfvPo",  
    "2013 Clara Gustafson"   :  "003d000000wj9Qk",  
    "2013 David Roger"   :  "003d000000wj9Qt",  
    "2013 Eleanor Meegoda"   :  "003d000001AfvPp",  
    "2013 Eli Schwarz"   :  "003d000001AfvPq",  
    "2013 Eric Olson"   : "003d000000xBE5l",  
    "2013 Eric Huang"   : "003d000000wj9QQ",  
    "2013 Evan Brandoff"   :  "003d000000wj9Qb",  
    "2013 Fiona O'LearySloan"   : "003d000000wj9Qf",  
    "2013 Franklin Weldon"   :  "003d000001AfvPr",  
    "2013 Giuseppe Crosti"   :  "003d000000wj9Qx",  
    "2013 Jack Farrell"   : "003d000000wj9QU",  
    "2013 James Plew"   : "003d000000wj9QX",  
    "2013 John Yarchoan"   :  "003d000001AfvPs",  
    "2013 Jon Hills"   :  "003d000001AfvPy",  
    "2013 Kate Leisy"   : "003d000001AfvPz",  
    "2013 Kate Catlin"   :  "003d000000wj9Qj",  
    "2013 Kavan McEachern"   :  "003d000000wj9Qv",  
    "2013 Kwaku Osei"   : "003d000001AfvQ0",  
    "2013 Malavika Kesavan"   : "003d000000wj9R2",  
    "2013 Matt Fulton"   :  "003d000001AfvQ1",  
    "2013 Matthew Fish"   : "003d000001AfvQ2",  
    "2013 Maxwell Walters"   :  "003d000000wj9Qu",  
    "2013 Mike Wilner"   :  "003d000000wj9QR",  
    "2013 Mike Cunningham"   :  "003d000000wj9Qo",  
    "2013 Moss Amer"   :  "003d000000wj9Qc",  
    "2013 Oliver Li"   :  "003d000000wj9QY",  
    "2013 Paige Boehmcke"   : "003d000001AfvQ4",  
    "2013 Patrick McAnaney"   : "003d000000wj9QW",  
    "2013 Peter Spaulding"   :  "003d000000wj9Qz",  
    "2013 Peter DiPrinzio"   :  "003d000000wj9R1",  
    "2013 Rachel Apostoles"   : "003d000000wj9Qs",  
    "2013 Sam Roberts"   :  "003d000000wj9Qn",  
    "2013 Sean Jackson"   : "003d000001AfvQ6",  
    "2013 Shilpi Kumar"   : "003d000000wj9Qa",  
    "2013 Stella Safari"   :  "003d000000wj9Qq",  
    "2013 Steven Mazur"   : "003d000000wj9Qd",  
    "2013 Taylor Sundali"   : "003d000001AfvQ8",  
    "2013 Tom Lynam"   :  "003d000000wj9Qp",  
    "2013 Wesley Verne"   : "003d000001AfvQA",  
    "2013 Zoe Chaves"   : "003d000001AfvQB",  
    "2013 Zubin Teherani"   : "003d000000wj9QP",  
    "2014 Ada Sierraalta"   : "003d000001iT9jN",  
    "2014 Alex Yamamoto"   :  "003d000001duJGv",  
    "2014 Alexa Wilcox"   : "003d000001duJH4",  
    "2014 Alexander Baca"   : "003d000001duJHJ",  
    "2014 Andrew Foley"   : "003d000001iT9Cq",  
    "2014 Andrew Jones"   : "003d000001hvUnt",  
    "2014 Ari Fine"   : "003d000001hvUqY",  
    "2014 Armando Ochoa"   :  "003d000001duJGl",  
    "2014 Austin Crouse"   :  "003d000001iT97C",  
    "2014 Austin Mertz"   : "003d000001hvUq9",  
    "2014 Austin Rhoads"   :  "003d000001hvUpL",  
    "2014 Avery Hairston"   : "003d000001Yhz9O",  
    "2014 Ben Xue"   :  "003d000001iT9Bn",  
    "2014 Benjamin Platta"   :  "003d000001hvTyX",  
    "2014 Benjamin Snowdon"   : "003d000001duJGh",  
    "2014 Brendan Rice"   : "003d000001duJGX",  
    "2014 Brian Schwartz"   : "003d000001duJHD",  
    "2014 Camille Seyler"   : "003d000001iT99X",  
    "2014 Carolyn Jones"   :  "003d000001duJGW",  
    "2014 Catherine Gans"   : "003d000001duJGt",  
    "2014 Charlie Molthrop"   : "003d000001duJGr",  
    "2014 Chip Koziara"   : "003d000001hvUpu",  
    "2014 Chisom Uche"   :  "003d000001hvUns",  
    "2014 Christian Britto"   : "003d000001duJHC",  
    "2014 Christopher Holter"   : "003d000001iT8p7",  
    "2014 Clare O'Brien"   :  "003d000001iT8jC",  
    "2014 Daniel Allen"   : "003d000001duJGU",  
    "2014 Daniel Klemmer"   : "003d000001duJGd",  
    "2014 Daniel Garfield"   :  "003d000001duJHI",  
    "2014 Dillon Myers"   : "003d000001Yhz9H",  
    "2014 Drake Berglund"   : "003d000001iT8qt",  
    "2014 Dylan Gordon"   : "003d000001duJGu",  
    "2014 Dylan Spencer"   :  "003d000001iT9k1",  
    "2014 Eddie Wharton"   :  "003d000001duJHH",  
    "2014 Edie Feinstein"   : "003d000000wj9QB",  
    "2014 Elizabeth Nicholas"   : "003d000001duJGz",  
    "2014 Emily Tseng"   :  "003d000001duJGa",  
    "2014 Emily Bowe"   : "003d000001hvUsa",  
    "2014 Evan Maclin"   :  "003d000001iT9kC",  
    "2014 Fabian Bock"   :  "003d000001iT8nH",  
    "2014 Forrest Miller"   : "003d000001duJGs",  
    "2014 Gabriel Cunningham"   : "003d000001duJGg",  
    "2014 Galen Foote"   :  "003d000001hvUr2",  
    "2014 Hadley Stein"   : "003d000001duJHB",  
    "2014 Harrison Tan"   : "003d000001hvpC5",  
    "2014 Hetali Lodaya"   :  "003d000001duJGY",  
    "2014 Jackson Morton"   : "003d000001iT9nj",  
    "2014 Jacob Robinson"   : "003d000001duJGZ",  
    "2014 Jennifer Galamba"   : "003d000001hvUpQ",  
    "2014 Jeremy Holtzman"   :  "003d000001duJGb",  
    "2014 Jessica Smith"   :  "003d000001duJGo",  
    "2014 Joan Thompson"   :  "003d000001hvUni",  
    "2014 Joe Morrison"   : "003d000001duJGR",  
    "2014 John Riker"   : "003d000001duJGw",  
    "2014 Jolene Gurevich"   :  "003d000001iT8oT",  
    "2014 Jon Galpern"   :  "003d000001iT9nP",  
    "2014 Julia Anaya"   :  "003d000001duJH6",  
    "2014 Julie Bock"   : "003d000001duJGm",  
    "2014 Karyn Vilbig"   : "003d000001duJGx",  
    "2014 Kate Murray"   :  "003d000001duJGn",  
    "2014 Katherine Robinson"   : "003d000001duJGP",  
    "2014 Kathryn Lawhon"   : "003d000001duJHF",  
    "2014 Keith Porter"   : "003d000001duJHA",  
    "2014 Kevin Suh"   :  "003d000001duJGq",  
    "2014 Labib Rahman"   : "003d000001duJGk",  
    "2014 Leigh Sevin"   :  "003d000001duJHG",  
    "2014 Lena Kelly"   : "003d000001duJH0",  
    "2014 Louisa Lee"   : "003d000001hvpOZ",  
    "2014 Luis Gallardo"   :  "003d000001duJGQ",  
    "2014 Lynsey Chediak"   : "003d000001duJH7",  
    "2014 Matthew Nicholas"   : "003d000001duJH2",  
    "2014 Merlin Patterson"   : "003d000001iT9l9",  
    "2014 Michael Tucker"   : "003d000001iT8pl",  
    "2014 Mike Tantum"   :  "003d000001hvpPi",  
    "2014 Mitch Rubin"   :  "003d000001duJGf",  
    "2014 Molly Adair"   :  "003d000001hvpTd",  
    "2014 Muhga Eltigani"   : "003d000001hvpUR",  
    "2014 Nancy DaSilva"   :  "003d000001duJGy",  
    "2014 Natalie Akers"   :  "003d000001iT9mM",  
    "2014 Nathaniel Rattner"   :  "003d000001duJH9",  
    "2014 Nazli Danis"   :  "003d000001hvpWS",  
    "2014 Oluwagbemiro Oyewole"   : "003d000001hvpgt",  
    "2014 Patrick Leonard"   :  "003d000001iT8xa",  
    "2014 Paul de Konkoly Thege"   :  "003d000001hvpYJ",  
    "2014 Ranjani Sridhara"   : "003d000001duJGT",  
    "2014 Robert Palacios"   :  "003d000001hvpaI",  
    "2014 Russell Suskind"   :  "003d000001iT96C",  
    "2014 Sanath Sambamoorthi"   :  "003d000001iT8rX",  
    "2014 Sean Wen"   : "003d000001duJH3",  
    "2014 Sean Rowland"   : "003d000001Yhz9l",  
    "2014 Seth Forsgren"   :  "003d000001hvpfq",  
    "2014 Spencer Wolfe"   :  "003d000001iT9IO",  
    "2014 Stephanie Johnson"   :  "003d000001iT9Is",  
    "2014 Stephen Rees"   : "003d000001iT9ls",  
    "2014 Swadhruth Komanduri"   :  "003d000001hvpi1",  
    "2014 Taher Hassonjee"   :  "003d000001iT8ug",  
    "2014 Thomas Stern"   : "003d000001hvpkD",  
    "2014 Timothy Morris"   : "003d000001duJH1",  
    "2014 Virginia Kase"   :  "003d000001duJGV",  
    "2014 Zachary Kaufman"   :  "003d000001hvphP",  
    "2015 Anders Lindgren"   :  "003d000001rwzwI",  
    "2015 Cynthia Plotch"   : "003d000001rw8hZ",  
    "2015 Anish Dalal"   :  "003d000001rwzWv",  
    "2015 Elizabeth McDonald"   : "003d000001rx00V",  
    "2015 Fran Mayo"   :  "003d000001rwzxk",  
    "2015 Bethany Stachenfled"   :  "003d000002IgLwA",  
    "2015 John Docal"   : "003d000001rwzda",  
    "2015 Michael Weinstein"   :  "003d000001rx0hp",  
    "2015 Mark Bennett"   : "003d000001rwzOF",  
    "2015 Haley Shoaf"   :  "003d000001rx0aq",  
    "2015 Ben Atnipp"   : "003d000001rwzKa",  
    "2015 Mary Cornfield"   : "003d000001rwzTE",  
    "2015 Michael Kungl"   :  "003d000001rwzpB",  
    "2015 Emilie Lima Burke"   :  "003d000001rwzSA",  
    "2015 Gianmarino Elio Orlandi"   :  "003d000002Ig06s",  
    "2015 Max Haskin"   : "003d000002Ig06u",  
    "2015 Anna Isachenko"   : "003d000002Ig06v",  
    "2015 Paula Gonzalez"   : "003d000002Ig06w",  
    "2015 Sophie Kaye"   :  "003d000002Ig06z",  
    "2015 Sara Eklund"   :  "003d000002Ig070",  
    "2015 Edward Gregory Klemmer"   : "003d000002Ig072",  
    "2015 Andrew Harris"   :  "003d000002Ig073",  
    "2015 Michael Harrison"   : "003d000002Ig074",  
    "2015 Kelly Kang"   : "003d000002Ig075",  
    "2015 Alyssa Gill"   :  "003d000002Ig076",  
    "2015 Max Kaplan"   : "003d000002Ig077",  
    "2015 Joel Kaplan"   :  "003d000002Ig078",  
    "2015 Brian Hickey"   : "003d000002Ig079",  
    "2015 Jesse Golomb"   : "003d000002Ig07t",  
    "2015 Caroline Hatfield"   :  "003d000002Ig07u",  
    "2015 Tyler Gilcrest"   : "003d000002Ig07w",  
    "2015 Josh Goryl"   : "003d000002Ig07x",  
    "2015 Sophie Janaskie"   :  "003d000002Ig088",  
    "2015 Jinesh Shah"   :  "003d000002IgJrQ",  
    "2015 Dylan McNally"   :  "003d000002IgJrR",  
    "2015 Emma Stegman"   : "003d000002IgJrS",  
    "2015 Jacqueline Taylor"   :  "003d000002IgJrT",  
    "2015 Maxwell Kilb"   : "003d000002IgJrU",  
    "2015 Dennis Shih"   :  "003d000002IgJrV",  
    "2015 Nick Baker"   : "003d000002IgJrW",  
    "2015 Vinay Seshachellam"   : "003d000002IgJrX",  
    "2015 Megan Lu"   : "003d000002IgJrY",  
    "2015 Arianna Robbins"   :  "003d000002IgJrZ",  
    "2015 Jordan Robarge"   : "003d000002IgJra",  
    "2015 Adele Zhang"   :  "003d000002IgJrb",  
    "2015 Brian Yormak"   : "003d000002IgJrc",  
    "2015 Ty Diringer"   :  "003d000002IgJrd",  
    "2015 Ashley Meeks"   : "003d000002IgJre",  
    "2015 Amanda Silver"   :  "003d000002IgJrf",  
    "2015 Caroline Kirkwood"   :  "003d000002IgJrg",  
    "2015 Lauren Roth"   :  "003d000002IgJrh",  
    "2015 Fay Walker"   : "003d000002IgJri",  
    "2015 Charlie Weikert"   :  "003d000002IgJrj",  
    "2015 Jack Wise"   :  "003d000002IgJrk",  
    "2015 Jason Wu"   : "003d000002IgJrl",  
    "2015 Amanda Tien"   :  "003d000002IgJrm",  
    "2015 Sean Reimer"   :  "003d000002IgJrn",  
    "2015 Simon Persico"   :  "003d000002IgJro",  
    "2015 Christopher Morse"   :  "003d000002IgJrp",  
    "2015 Meredith Persico"   : "003d000002IgJrq",  
    "2015 Snehal Sawlani"   : "003d000002IgJrr",  
    "2015 Maggie Nunley"   :  "003d000002IgJrt",  
    "2015 Dylan Ramirez"   :  "003d000002IgJru",  
    "2015 Pooja Kodavanti"   :  "003d000002IgJrv",  
    "2015 Jamie Norwood"   :  "003d000002IgJrw",  
    "2015 Lauren Tiberi-Warner"   : "003d000002IgJrx",  
    "2015 Evan Snyder"   :  "003d000002IgJry",  
    "2015 Lisa Li"   :  "003d000002IgJrz",  
    "2015 Benjamin Weinstein"   : "003d000002IgJs1",  
    "2015 Garrett Ransom"   : "003d000002IgJs2",  
    "2015 Isaac MacDonald"   :  "003d000002IgJs3",  
    "2015 Nathan Robertson"   : "003d000002IgJs4",  
    "2015 Syeda Naureen Rizvi"   :  "003d000002IgJs5",  
    "2015 Sam Rispaud"   :  "003d000002IgJs6",  
    "2015 Christopher Kontes"   : "003d000002IgJs7",  
    "2015 Landon Acriche"   : "003d000002Ifz3J",  
    "2015 Claudia Lujan"   :  "003d000002IgJIh",  
    "2015 Mikayla Wickman"   :  "003d000002IgL6D",  
    "2015 Charles Schwartz"   : "003d000002IgL6E",  
    "2015 Willem Prins"   : "003d000002IgL6F",  
    "2015 Daniel Yellin"   :  "003d000002IgL6G",  
    "2015 Meghan Saunders"   :  "003d000002IgL6J",  
    "2015 Samuel Lowenkamp"   : "003d000002IgL6K",  
    "2015 Yvette Rodriguez"   : "003d000002IgL6L",  
    "2015 Cathryn Woodruff"   : "003d000002IgL6N",  
    "2015 Ari Peña"   : "003d000002IgL6Y",  
    "2015 Dutch Waanders"   : "003d000002IgL6b",  
    "2015 Priyang Shah"   : "003d000002IgL6c",  
    "2015 Nora West"   :  "003d000002IgL6s",  
    "2015 Julian Van Der Made"   :  "003d000002IgL6t",  
    "2015 Nadia Laher"   :  "003d000002IgL6v",  
    "2015 Muhan Zhang"   :  "003d000002IgL6w",  
    "2015 Colleen Scanlon"   :  "003d000002IgL73",  
    "2015 Tia Davis"   :  "003d000002Ig03V",  
    "2015 Timothy Barry"   :  "003d000002Ig03W",  
    "2015 Maggie Belshé"   :  "003d000002Ig03Y",  
    "2015 Michael Cox"   :  "003d000002Ig03Z",  
    "2015 Kasim Ahmad"   :  "003d000002Ig03a",  
    "2015 Nathan Bartell"   : "003d000002Ig03b",  
    "2015 Tade Anzalone"   :  "003d000002Ig041",  
    "2015 Matthew Burdumy"   :  "003d000002Ig042",  
    "2015 Pooja Avula"   :  "003d000002Ig043",  
    "2015 Cassandra Coravos"   :  "003d000002Ig045",  
    "2015 Kurt Alles"   : "003d000002Ig03I",  
    "2015 Frederick Adenuga"   :  "003d000002Ig03J",  
    "2015 Stewart Cory"   : "003d000002Ig03K",  
    "2015 Mark Chu"   : "003d000002Ig03L",  
    "2015 Jide Adebayo"   : "003d000002Ig03N",  
    "2015 Aseem Chipalkatti"   :  "003d000002Ig03O",  
    "2015 Dextina Booker"   : "003d000002Ig03P",  
    "2015 Emily Coch"   : "003d000002Ig03Q",  
    "2015 Marco Bernardo Espinosa"   :  "003d000002Ig03R",  
    "2015 Ellen Currin"   : "003d000002Ig03T",  
    "2015 Brock Cassidy"   :  "003d000002Ig03U",  
    "2015 Vanessa Paige"   :  "003d000002IdoWo",  
    "2015 Benjamin Seidman"   : "003d000002Idxmm",  
    "2015 Niki Chimberg"   :  "003d000002NUWg0",  
    "2015 Sarah Greenwood"   :  "003d000002Ig06r",  
    "2015 Devon Sanford"   :  "003d0000020zRU9",  
    "2015 Courtney Kishbaugh"   : "003d0000024Ej8D" 
  }
});

module.exports = router;
