(function () {
  'use strict';

  
  const RAW = [
    ["AF","AFG","Afghanistan","Afghanistan"],
    ["AX","ALA","Åland Islands","Ålandinseln"],
    ["AL","ALB","Albania","Albanien"],
    ["DZ","DZA","Algeria","Algerien"],
    ["AS","ASM","American Samoa","Amerikanisch-Samoa"],
    ["AD","AND","Andorra","Andorra"],
    ["AO","AGO","Angola","Angola"],
    ["AI","AIA","Anguilla","Anguilla"],
    ["AQ","ATA","Antarctica","Antarktis"],
    ["AG","ATG","Antigua and Barbuda","Antigua und Barbuda"],
    ["AR","ARG","Argentina","Argentinien","Argentine"],
    ["AM","ARM","Armenia","Armenien"],
    ["AW","ABW","Aruba","Aruba"],
    ["AU","AUS","Australia","Australien"],
    ["AT","AUT","Austria","Österreich","Oesterreich","Republic of Austria"],
    ["AZ","AZE","Azerbaijan","Aserbaidschan"],
    ["BS","BHS","Bahamas","Bahamas","The Bahamas"],
    ["BH","BHR","Bahrain","Bahrain"],
    ["BD","BGD","Bangladesh","Bangladesch"],
    ["BB","BRB","Barbados","Barbados"],
    ["BY","BLR","Belarus","Weissrussland","Byelorussia"],
    ["BE","BEL","Belgium","Belgien","Belgique","Belgie"],
    ["BZ","BLZ","Belize","Belize"],
    ["BJ","BEN","Benin","Benin"],
    ["BM","BMU","Bermuda","Bermuda"],
    ["BT","BTN","Bhutan","Bhutan"],
    ["BO","BOL","Bolivia","Bolivien"],
    ["BQ","BES","Bonaire Sint Eustatius and Saba","Bonaire"],
    ["BA","BIH","Bosnia and Herzegovina","Bosnien und Herzegowina","Bosnia","Herzegovina"],
    ["BW","BWA","Botswana","Botswana"],
    ["BV","BVT","Bouvet Island","Bouvetinsel"],
    ["BR","BRA","Brazil","Brasilien","Brasil"],
    ["IO","IOT","British Indian Ocean Territory","Britisches Territorium im Indischen Ozean"],
    ["BN","BRN","Brunei Darussalam","Brunei"],
    ["BG","BGR","Bulgaria","Bulgarien"],
    ["BF","BFA","Burkina Faso","Burkina Faso"],
    ["BI","BDI","Burundi","Burundi"],
    ["CV","CPV","Cabo Verde","Kap Verde","Cape Verde"],
    ["KH","KHM","Cambodia","Kambodscha"],
    ["CM","CMR","Cameroon","Kamerun"],
    ["CA","CAN","Canada","Kanada"],
    ["KY","CYM","Cayman Islands","Kaimaninseln"],
    ["CF","CAF","Central African Republic","Zentralafrikanische Republik"],
    ["TD","TCD","Chad","Tschad"],
    ["CL","CHL","Chile","Chile"],
    ["CN","CHN","China","China","Peoples Republic of China","PRC"],
    ["CX","CXR","Christmas Island","Weihnachtsinsel"],
    ["CC","CCK","Cocos Islands","Kokosinseln","Keeling Islands"],
    ["CO","COL","Colombia","Kolumbien"],
    ["KM","COM","Comoros","Komoren"],
    ["CD","COD","Congo Democratic Republic","Demokratische Republik Kongo","DR Congo","DRC","Zaire"],
    ["CG","COG","Congo","Republik Kongo","Republic of the Congo"],
    ["CK","COK","Cook Islands","Cookinseln"],
    ["CR","CRI","Costa Rica","Costa Rica"],
    ["CI","CIV","Cote d'Ivoire","Elfenbeinkuste","Ivory Coast"],
    ["HR","HRV","Croatia","Kroatien"],
    ["CU","CUB","Cuba","Kuba"],
    ["CW","CUW","Curacao","Curacao"],
    ["CY","CYP","Cyprus","Zypern"],
    ["CZ","CZE","Czechia","Tschechien","Czech Republic"],
    ["DK","DNK","Denmark","Danemark","Danmark"],
    ["DJ","DJI","Djibouti","Dschibuti"],
    ["DM","DMA","Dominica","Dominica"],
    ["DO","DOM","Dominican Republic","Dominikanische Republik"],
    ["EC","ECU","Ecuador","Ecuador"],
    ["EG","EGY","Egypt","Agypten"],
    ["SV","SLV","El Salvador","El Salvador"],
    ["GQ","GNQ","Equatorial Guinea","Aquatorialguinea"],
    ["ER","ERI","Eritrea","Eritrea"],
    ["EE","EST","Estonia","Estland"],
    ["SZ","SWZ","Eswatini","Eswatini","Swaziland"],
    ["ET","ETH","Ethiopia","Athiopien"],
    ["FK","FLK","Falkland Islands","Falklandinseln","Malvinas"],
    ["FO","FRO","Faroe Islands","Faroer"],
    ["FJ","FJI","Fiji","Fidschi"],
    ["FI","FIN","Finland","Finnland","Suomi"],
    ["FR","FRA","France","Frankreich"],
    ["GF","GUF","French Guiana","Franzoesisch-Guayana"],
    ["PF","PYF","French Polynesia","Franzoesisch-Polynesien"],
    ["TF","ATF","French Southern Territories","Franzoesische Sudgebiete"],
    ["GA","GAB","Gabon","Gabun"],
    ["GM","GMB","Gambia","Gambia"],
    ["GE","GEO","Georgia","Georgien"],
    ["DE","DEU","Germany","Deutschland"],
    ["GH","GHA","Ghana","Ghana"],
    ["GI","GIB","Gibraltar","Gibraltar"],
    ["GR","GRC","Greece","Griechenland","Hellas"],
    ["GL","GRL","Greenland","Gronland"],
    ["GD","GRD","Grenada","Grenada"],
    ["GP","GLP","Guadeloupe","Guadeloupe"],
    ["GU","GUM","Guam","Guam"],
    ["GT","GTM","Guatemala","Guatemala"],
    ["GG","GGY","Guernsey","Guernsey"],
    ["GN","GIN","Guinea","Guinea"],
    ["GW","GNB","Guinea-Bissau","Guinea-Bissau"],
    ["GY","GUY","Guyana","Guyana"],
    ["HT","HTI","Haiti","Haiti"],
    ["HM","HMD","Heard and McDonald Islands","Heard und McDonaldinseln"],
    ["VA","VAT","Holy See","Vatikanstadt","Vatican","Vatican City"],
    ["HN","HND","Honduras","Honduras"],
    ["HK","HKG","Hong Kong","Hongkong"],
    ["HU","HUN","Hungary","Ungarn"],
    ["IS","ISL","Iceland","Island"],
    ["IN","IND","India","Indien"],
    ["ID","IDN","Indonesia","Indonesien"],
    ["IR","IRN","Iran","Iran","Islamic Republic of Iran"],
    ["IQ","IRQ","Iraq","Irak"],
    ["IE","IRL","Ireland","Irland"],
    ["IM","IMN","Isle of Man","Isle of Man"],
    ["IL","ISR","Israel","Israel"],
    ["IT","ITA","Italy","Italien","Italia"],
    ["JM","JAM","Jamaica","Jamaika"],
    ["JP","JPN","Japan","Japan"],
    ["JE","JEY","Jersey","Jersey"],
    ["JO","JOR","Jordan","Jordanien"],
    ["KZ","KAZ","Kazakhstan","Kasachstan"],
    ["KE","KEN","Kenya","Kenia"],
    ["KI","KIR","Kiribati","Kiribati"],
    ["KP","PRK","North Korea","Nordkorea"],
    ["KR","KOR","South Korea","Sudkorea"],
    ["KW","KWT","Kuwait","Kuwait"],
    ["KG","KGZ","Kyrgyzstan","Kirgisistan"],
    ["LA","LAO","Laos","Laos"],
    ["LV","LVA","Latvia","Lettland"],
    ["LB","LBN","Lebanon","Libanon"],
    ["LS","LSO","Lesotho","Lesotho"],
    ["LR","LBR","Liberia","Liberia"],
    ["LY","LBY","Libya","Libyen"],
    ["LI","LIE","Liechtenstein","Liechtenstein"],
    ["LT","LTU","Lithuania","Litauen"],
    ["LU","LUX","Luxembourg","Luxemburg"],
    ["MO","MAC","Macao","Macau"],
    ["MG","MDG","Madagascar","Madagaskar"],
    ["MW","MWI","Malawi","Malawi"],
    ["MY","MYS","Malaysia","Malaysia"],
    ["MV","MDV","Maldives","Malediven"],
    ["ML","MLI","Mali","Mali"],
    ["MT","MLT","Malta","Malta"],
    ["MH","MHL","Marshall Islands","Marshallinseln"],
    ["MQ","MTQ","Martinique","Martinique"],
    ["MR","MRT","Mauritania","Mauretanien"],
    ["MU","MUS","Mauritius","Mauritius"],
    ["YT","MYT","Mayotte","Mayotte"],
    ["MX","MEX","Mexico","Mexiko"],
    ["FM","FSM","Micronesia","Mikronesien"],
    ["MD","MDA","Moldova","Moldau","Republic of Moldova"],
    ["MC","MCO","Monaco","Monaco"],
    ["MN","MNG","Mongolia","Mongolei"],
    ["ME","MNE","Montenegro","Montenegro"],
    ["MS","MSR","Montserrat","Montserrat"],
    ["MA","MAR","Morocco","Marokko"],
    ["MZ","MOZ","Mozambique","Mosambik"],
    ["MM","MMR","Myanmar","Myanmar","Burma"],
    ["NA","NAM","Namibia","Namibia"],
    ["NR","NRU","Nauru","Nauru"],
    ["NP","NPL","Nepal","Nepal"],
    ["NL","NLD","Netherlands","Niederlande","Holland"],
    ["NC","NCL","New Caledonia","Neukaledonien"],
    ["NZ","NZL","New Zealand","Neuseeland"],
    ["NI","NIC","Nicaragua","Nicaragua"],
    ["NE","NER","Niger","Niger"],
    ["NG","NGA","Nigeria","Nigeria"],
    ["NU","NIU","Niue","Niue"],
    ["NF","NFK","Norfolk Island","Norfolkinsel"],
    ["MK","MKD","North Macedonia","Nordmazedonien","Macedonia"],
    ["MP","MNP","Northern Mariana Islands","Nordliche Marianen"],
    ["NO","NOR","Norway","Norwegen","Norge"],
    ["OM","OMN","Oman","Oman"],
    ["PK","PAK","Pakistan","Pakistan"],
    ["PW","PLW","Palau","Palau"],
    ["PS","PSE","Palestine","Palastina","Palestinian Territory"],
    ["PA","PAN","Panama","Panama"],
    ["PG","PNG","Papua New Guinea","Papua-Neuguinea"],
    ["PY","PRY","Paraguay","Paraguay"],
    ["PE","PER","Peru","Peru"],
    ["PH","PHL","Philippines","Philippinen"],
    ["PN","PCN","Pitcairn","Pitcairninseln"],
    ["PL","POL","Poland","Polen","Polska"],
    ["PT","PRT","Portugal","Portugal"],
    ["PR","PRI","Puerto Rico","Puerto Rico"],
    ["QA","QAT","Qatar","Katar"],
    ["RE","REU","Reunion","Reunion"],
    ["RO","ROU","Romania","Rumanien"],
    ["RU","RUS","Russia","Russland","Russian Federation"],
    ["RW","RWA","Rwanda","Ruanda"],
    ["BL","BLM","Saint Barthelemy","Saint-Barthelemy"],
    ["SH","SHN","Saint Helena","St. Helena"],
    ["KN","KNA","Saint Kitts and Nevis","St. Kitts und Nevis"],
    ["LC","LCA","Saint Lucia","St. Lucia"],
    ["MF","MAF","Saint Martin","Saint-Martin"],
    ["PM","SPM","Saint Pierre and Miquelon","Saint-Pierre und Miquelon"],
    ["VC","VCT","Saint Vincent and the Grenadines","St. Vincent und die Grenadinen"],
    ["WS","WSM","Samoa","Samoa"],
    ["SM","SMR","San Marino","San Marino"],
    ["ST","STP","Sao Tome and Principe","Sao Tome und Principe"],
    ["SA","SAU","Saudi Arabia","Saudi-Arabien"],
    ["SN","SEN","Senegal","Senegal"],
    ["RS","SRB","Serbia","Serbien"],
    ["SC","SYC","Seychelles","Seychellen"],
    ["SL","SLE","Sierra Leone","Sierra Leone"],
    ["SG","SGP","Singapore","Singapur"],
    ["SX","SXM","Sint Maarten","Sint Maarten"],
    ["SK","SVK","Slovakia","Slowakei"],
    ["SI","SVN","Slovenia","Slowenien"],
    ["SB","SLB","Solomon Islands","Salomonen"],
    ["SO","SOM","Somalia","Somalia"],
    ["ZA","ZAF","South Africa","Sudafrika"],
    ["GS","SGS","South Georgia","Sudgeorgien"],
    ["SS","SSD","South Sudan","Sudsudan"],
    ["ES","ESP","Spain","Spanien","Espana"],
    ["LK","LKA","Sri Lanka","Sri Lanka","Ceylon"],
    ["SD","SDN","Sudan","Sudan"],
    ["SR","SUR","Suriname","Suriname"],
    ["SJ","SJM","Svalbard and Jan Mayen","Svalbard und Jan Mayen"],
    ["SE","SWE","Sweden","Schweden","Sverige"],
    ["CH","CHE","Switzerland","Schweiz","Suisse","Svizzera"],
    ["SY","SYR","Syria","Syrien"],
    ["TW","TWN","Taiwan","Taiwan"],
    ["TJ","TJK","Tajikistan","Tadschikistan"],
    ["TZ","TZA","Tanzania","Tansania"],
    ["TH","THA","Thailand","Thailand"],
    ["TL","TLS","Timor-Leste","Osttimor","East Timor"],
    ["TG","TGO","Togo","Togo"],
    ["TK","TKL","Tokelau","Tokelau"],
    ["TO","TON","Tonga","Tonga"],
    ["TT","TTO","Trinidad and Tobago","Trinidad und Tobago"],
    ["TN","TUN","Tunisia","Tunesien"],
    ["TR","TUR","Turkey","Turkei","Turkiye"],
    ["TM","TKM","Turkmenistan","Turkmenistan"],
    ["TC","TCA","Turks and Caicos Islands","Turks- und Caicosinseln"],
    ["TV","TUV","Tuvalu","Tuvalu"],
    ["UG","UGA","Uganda","Uganda"],
    ["UA","UKR","Ukraine","Ukraine"],
    ["AE","ARE","United Arab Emirates","Vereinigte Arabische Emirate","UAE"],
    ["GB","GBR","United Kingdom","Vereinigtes Konigreich","UK","Great Britain","England"],
    ["UM","UMI","US Minor Outlying Islands","Kleinere Amerikanische Uberseeinseln"],
    ["US","USA","United States","Vereinigte Staaten","USA","United States of America","America"],
    ["UY","URY","Uruguay","Uruguay"],
    ["UZ","UZB","Uzbekistan","Usbekistan"],
    ["VU","VUT","Vanuatu","Vanuatu"],
    ["VE","VEN","Venezuela","Venezuela"],
    ["VN","VNM","Vietnam","Vietnam"],
    ["VG","VGB","British Virgin Islands","Britische Jungferninseln"],
    ["VI","VIR","US Virgin Islands","Amerikanische Jungferninseln"],
    ["WF","WLF","Wallis and Futuna","Wallis und Futuna"],
    ["EH","ESH","Western Sahara","Westsahara"],
    ["YE","YEM","Yemen","Jemen"],
    ["ZM","ZMB","Zambia","Sambia"],
    ["ZW","ZWE","Zimbabwe","Simbabwe"]
  ];

  
  const iso2Map = new Map();
  const iso3Map = new Map();
  const nameSet = new Set();
  const searchIndex = [];

  // Country names in many languages, generated by the browser (Intl.DisplayNames).
  // Used for display in the UI language, for search, and to recognise
  // country dropdowns on websites in other languages.
  function uiLang() {
    try {
      const l = chrome.i18n.getMessage('@@ui_locale') || chrome.i18n.getUILanguage();
      if (l) return l.replace('_', '-');
    } catch (e) {}
    return navigator.language || 'en';
  }
  const UI_LANG = uiLang();
  const langs = ['en', 'de', 'fr', 'es', 'it', 'pt', 'nl', 'pl', 'tr', 'sv', 'da', 'nb', 'fi', 'cs', UI_LANG];
  try { if (navigator.language) langs.push(navigator.language); } catch (e) {}
  try { if (document.documentElement.lang) langs.push(document.documentElement.lang); } catch (e) {}
  const displayNames = [];
  const seenLang = new Set();
  for (const l of langs) {
    if (!l || seenLang.has(l)) continue;
    seenLang.add(l);
    try { displayNames.push(new Intl.DisplayNames([l], { type: 'region' })); } catch (e) {}
  }
  let uiNames = null;
  try { uiNames = new Intl.DisplayNames([UI_LANG, 'en'], { type: 'region' }); } catch (e) {}

  const countries = [];
  for (const row of RAW) {
    const country = { iso2: row[0], iso3: row[1], en: row[2], de: row[3], aliases: row.slice(4) };
    const known = new Set([country.en, country.de].concat(country.aliases).filter(Boolean).map(function (n) { return n.toLowerCase(); }));
    for (const dn of displayNames) {
      try {
        const n = dn.of(country.iso2);
        if (n && n !== country.iso2 && !known.has(n.toLowerCase())) { known.add(n.toLowerCase()); country.aliases.push(n); }
      } catch (e) {}
    }
    let local = null;
    if (/^de\b/i.test(UI_LANG)) local = country.de;
    else if (/^en\b/i.test(UI_LANG)) local = country.en;
    else { try { local = uiNames && uiNames.of(country.iso2); } catch (e) {} }
    country.local = (local && local !== country.iso2) ? local : country.en;
    countries.push(country);
    iso2Map.set(country.iso2, country);
    iso3Map.set(country.iso3, country);
    const allNames = [country.local, country.en, country.de, ...country.aliases];
    for (const name of allNames) {
      if (!name) continue;
      const lower = name.toLowerCase();
      nameSet.add(lower);
      searchIndex.push({ name, lower, country });
    }
    nameSet.add(country.iso2.toLowerCase());
    nameSet.add(country.iso3.toLowerCase());
  }

  
  function searchCountries(query, maxResults) {
    maxResults = maxResults || 10;
    const q = query.trim().toLowerCase();
    if (!q) return [];
    const results = [];
    const seen = new Set();

    
    if (/^[a-z]{2}$/.test(q)) {
      const c = iso2Map.get(q.toUpperCase());
      if (c) { results.push(c); seen.add(c.iso2); }
    }
    
    if (/^[a-z]{3}$/.test(q)) {
      const c = iso3Map.get(q.toUpperCase());
      if (c && !seen.has(c.iso2)) { results.push(c); seen.add(c.iso2); }
    }
    
    for (const e of searchIndex) {
      if (results.length >= maxResults) break;
      if (e.lower.startsWith(q) && !seen.has(e.country.iso2)) {
        results.push(e.country); seen.add(e.country.iso2);
      }
    }
    
    for (const e of searchIndex) {
      if (results.length >= maxResults) break;
      if (e.lower.includes(q) && !seen.has(e.country.iso2)) {
        results.push(e.country); seen.add(e.country.iso2);
      }
    }
    return results;
  }

  
  function findCountry(codeOrName) {
    if (!codeOrName) return null;
    const upper = codeOrName.trim().toUpperCase();
    const lower = codeOrName.trim().toLowerCase();
    return iso2Map.get(upper) || iso3Map.get(upper) ||
           (searchIndex.find(function(e) { return e.lower === lower; }) || {}).country || null;
  }

  window.COUNTRY_PREFERRED_DATA = {
    countries: countries,
    iso2Map: iso2Map,
    iso3Map: iso3Map,
    nameSet: nameSet,
    searchCountries: searchCountries,
    findCountry: findCountry
  };

})();
