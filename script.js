document.addEventListener('DOMContentLoaded', function() {
    // Address data structure (simplified for demonstration - you'll want to expand this)
    const addressData = {
    // REGION 1: National Capital Region (NCR)
    "National Capital Region (NCR)": {
        "Manila": {
            "Malate": ["Barangay 700", "Barangay 701", "Barangay 702", "Barangay 703", "Barangay 704"],
            "Intramuros": ["Barangay 655", "Barangay 656", "Barangay 657", "Barangay 658", "Barangay 659"],
            "Sampaloc": ["Barangay 395", "Barangay 396", "Barangay 397", "Barangay 398", "Barangay 399"],
            "Tondo": ["Barangay 1", "Barangay 2", "Barangay 3", "Barangay 4", "Barangay 5"],
            "Binondo": ["Barangay 287", "Barangay 288", "Barangay 289", "Barangay 290", "Barangay 291"]
        },
        "Quezon City": {
            "Diliman": ["Barangay Pinyahan", "Barangay Krus na Ligas", "Barangay UP Campus", "Barangay Central", "Barangay Old Capitol Site"],
            "Cubao": ["Barangay Immaculate Conception", "Barangay E. Rodriguez", "Barangay Socorro", "Barangay San Martin de Porres", "Barangay Silangan"],
            "Novaliches": ["Barangay Bagbag", "Barangay Gulod", "Barangay San Agustin", "Barangay Sta. Monica", "Barangay Kaligayahan"],
            "Galas": ["Barangay Kamuning", "Barangay Laging Handa", "Barangay Malaya", "Barangay Paligsahan", "Barangay Pinagkaisahan"],
            "Project 4": ["Barangay Quirino 2-A", "Barangay Quirino 2-B", "Barangay Quirino 2-C", "Barangay Quirino 3-A", "Barangay San Isidro Labrador"]
        },
        "Makati": {
            "Poblacion": ["Barangay Poblacion", "Barangay Tejeros", "Barangay Olympia", "Barangay Valenzuela", "Barangay Pio del Pilar"],
            "Bel-Air": ["Barangay Bel-Air", "Barangay San Lorenzo", "Barangay Urdaneta", "Barangay Magallanes", "Barangay Dasmarinas"],
            "Forbes Park": ["Zone 1", "Zone 2", "Zone 3", "Zone 4", "Zone 5"],
            "San Antonio": ["West Sector", "East Sector", "North Sector", "South Sector", "Central Sector"],
            "Cembo": ["Purok 1", "Purok 2", "Purok 3", "Purok 4", "Purok 5"]
        },
        "Pasay": {
            "Baclaran": ["Barangay 76", "Barangay 77", "Barangay 78", "Barangay 79", "Barangay 80"],
            "Malibay": ["Barangay 145", "Barangay 146", "Barangay 147", "Barangay 148", "Barangay 149"],
            "Pasay Proper": ["Barangay 1", "Barangay 2", "Barangay 3", "Barangay 4", "Barangay 5"],
            "San Isidro": ["Barangay 132", "Barangay 133", "Barangay 134", "Barangay 135", "Barangay 136"],
            "Santa Clara": ["Barangay 186", "Barangay 187", "Barangay 188", "Barangay 189", "Barangay 190"]
        },
        "Taguig": {
            "Bonifacio Global City": ["Barangay Fort Bonifacio", "Barangay Pinagsama", "Barangay Western Bicutan", "Barangay Upper Bicutan", "Barangay Central Bicutan"],
            "Signal Village": ["Area A", "Area B", "Area C", "Area D", "Area E"],
            "Lower Bicutan": ["Phase 1", "Phase 2", "Phase 3", "Phase 4", "Phase 5"],
            "New Lower Bicutan": ["Block 1", "Block 2", "Block 3", "Block 4", "Block 5"],
            "North Signal Village": ["Sector 1", "Sector 2", "Sector 3", "Sector 4", "Sector 5"]
        }
    },

    // REGION 2: Calabarzon
    "Calabarzon (Region IV-A)": {
        "Cavite": {
            "Bacoor": ["Barangay Alima", "Barangay Aniban", "Barangay Talaba", "Barangay Zapote", "Barangay Niog"],
            "Dasmariñas": ["Barangay Burol", "Barangay Langkaan", "Barangay Paliparan", "Barangay Sabang", "Barangay Salawag"],
            "Imus": ["Barangay Anabu", "Barangay Buhay na Tubig", "Barangay Malagasang", "Barangay Medicion", "Barangay Toclong"],
            "General Trias": ["Barangay Buenavista", "Barangay Governor's Drive", "Barangay Manggahan", "Barangay Pasong Camachile", "Barangay San Francisco"],
            "Tagaytay": ["Barangay Asisan", "Barangay Kaybagal", "Barangay Maharlika", "Barangay Mendez Crossing", "Barangay Silang Junction"]
        },
        "Laguna": {
            "Santa Rosa": ["Barangay Aplaya", "Barangay Balibago", "Barangay Don Jose", "Barangay Macabling", "Barangay Tagapo"],
            "Calamba": ["Barangay Canlubang", "Barangay Mayapa", "Barangay Paciano Rizal", "Barangay Parian", "Barangay Real"],
            "San Pablo": ["Barangay Dolores", "Barangay San Cristobal", "Barangay San Lucas 1", "Barangay San Roque", "Barangay Santiago 1"],
            "Biñan": ["Barangay Canlalay", "Barangay Langkiwa", "Barangay Malaban", "Barangay Santo Tomas", "Barangay Tubigan"],
            "Los Baños": ["Barangay Anos", "Barangay Batong Malake", "Barangay Baybayin", "Barangay Mayondon", "Barangay Timugan"]
        },
        "Batangas": {
            "Batangas City": ["Barangay Alangilan", "Barangay Balagtas", "Barangay Kumintang Ibaba", "Barangay Poblacion", "Barangay Sta. Rita Karsada"],
            "Lipa": ["Barangay Bagong Pook", "Barangay Bolbok", "Barangay Lodlod", "Barangay Sabang", "Barangay Talisay"],
            "Santo Tomas": ["Barangay Poblacion 1", "Barangay San Felix", "Barangay San Fernando", "Barangay San Francisco", "Barangay San Rafael"],
            "Tanauan": ["Barangay Bagumbayan", "Barangay Darasa", "Barangay Poblacion 1", "Barangay Sala", "Barangay Trapiche"],
            "San Juan": ["Barangay Calitcalit", "Barangay Lipahan", "Barangay Poblacion", "Barangay Poctol", "Barangay Sumaguing"]
        },
        "Rizal": {
            "Antipolo": ["Barangay Bagong Nayon", "Barangay Dalig", "Barangay Mayamot", "Barangay San Isidro", "Barangay San Jose"],
            "Cainta": ["Barangay San Andres", "Barangay San Isidro", "Barangay San Juan", "Barangay Santo Domingo", "Barangay Santo Niño"],
            "Taytay": ["Barangay Dolores", "Barangay Muzon", "Barangay San Isidro", "Barangay San Juan", "Barangay Santa Ana"],
            "Rodriguez (Montalban)": ["Barangay Balite", "Barangay Burgos", "Barangay Geronimo", "Barangay Manggahan", "Barangay San Isidro"],
            "San Mateo": ["Barangay Ampid 1", "Barangay Dulong Bayan 1", "Barangay Gulod Malaya", "Barangay Malanday", "Barangay Santo Niño"]
        },
        "Quezon": {
            "Lucena": ["Barangay Dalahican", "Barangay Gulang-Gulang", "Barangay Ibabang Dupay", "Barangay Mayao Silangan", "Barangay Talao-Talao"],
            "Tayabas": ["Barangay Alitao", "Barangay Isabang", "Barangay Lalo", "Barangay Mateuna", "Barangay Palola"],
            "Sariaya": ["Barangay Concepcion", "Barangay Janagdong", "Barangay Manggalang", "Barangay Montecillo", "Barangay San Roque"],
            "Candelaria": ["Barangay Bukal Sur", "Barangay Kinatihan", "Barangay Masin Norte", "Barangay Malabanban", "Barangay San Andres"],
            "Pagbilao": ["Barangay Alupaye", "Barangay Ibabang Polo", "Barangay Malicboy", "Barangay Pinagbayanan", "Barangay Talipan"]
        }
    },

    // REGION 3: Central Luzon
    "Central Luzon (Region III)": {
        "Bulacan": {
            "Malolos": ["Barangay Atlag", "Barangay Balite", "Barangay Caingin", "Barangay Guinhawa", "Barangay Longos"],
            "Meycauayan": ["Barangay Bancal", "Barangay Bahay Pare", "Barangay Calvario", "Barangay Liputan", "Barangay Pandayan"],
            "San Jose Del Monte": ["Barangay Citrus", "Barangay Fatima", "Barangay Kaypian", "Barangay Muzon", "Barangay Tungkong Mangga"],
            "Baliwag": ["Barangay Concepcion", "Barangay Makinabang", "Barangay Pagala", "Barangay Sabang", "Barangay Tarcan"],
            "Marilao": ["Barangay Abangan Norte", "Barangay Ibayo", "Barangay Loma de Gato", "Barangay Santa Rosa I", "Barangay Tabing Ilog"]
        },
        "Pampanga": {
            "San Fernando": ["Barangay Calulut", "Barangay Del Carmen", "Barangay Dolores", "Barangay San Isidro", "Barangay Telabastagan"],
            "Angeles": ["Barangay Balibago", "Barangay Cutcut", "Barangay Lourdes Sur", "Barangay Pampang", "Barangay Santo Rosario"],
            "Mabalacat": ["Barangay Dau", "Barangay Dolores", "Barangay Mabiga", "Barangay Poblacion", "Barangay Santa Ines"],
            "Guagua": ["Barangay Ascomo", "Barangay Plaza Burgos", "Barangay San Antonio", "Barangay San Miguel", "Barangay Santa Filomena"],
            "Mexico": ["Barangay Balas", "Barangay Lagundi", "Barangay Pangatlan", "Barangay San Carlos", "Barangay Suclaban"]
        },
        "Tarlac": {
            "Tarlac City": ["Barangay Aguso", "Barangay Burot", "Barangay Ligtasan", "Barangay San Miguel", "Barangay Villa Bacolor"],
            "Capas": ["Barangay Aranguren", "Barangay Cutcut II", "Barangay Lawy", "Barangay Santa Lucia", "Barangay Talaga"],
            "Concepcion": ["Barangay Balutu", "Barangay Magao", "Barangay Panlisiqui", "Barangay San Nicolas A", "Barangay Tinang"],
            "Paniqui": ["Barangay Apulid", "Barangay Estacion", "Barangay Patalan", "Barangay Poblacion Norte", "Barangay Samput"],
            "Gerona": ["Barangay Bularit", "Barangay Caturay", "Barangay New Salem", "Barangay Parsolingan", "Barangay Singat"]
        },
        "Nueva Ecija": {
            "Cabanatuan": ["Barangay Aduas Centro", "Barangay Kapitan Pepe", "Barangay Palagay", "Barangay San Josef Norte", "Barangay Valle Cruz"],
            "San Jose City": ["Barangay Abar 1st", "Barangay Caanawan", "Barangay Malasin", "Barangay Palestina", "Barangay Santo Niño"],
            "Gapan": ["Barangay Kapalangan", "Barangay Maburak", "Barangay Malimba", "Barangay Pambuan", "Barangay San Lorenzo"],
            "Palayan": ["Barangay Atate", "Barangay Imelda Valley", "Barangay Malate", "Barangay Mapait", "Barangay Singalat"],
            "Santa Rosa": ["Barangay Cojuangco", "Barangay Lourdes", "Barangay Matingkis", "Barangay San Josef", "Barangay Santo Rosario"]
        },
        "Zambales": {
            "Olongapo": ["Barangay Banicain", "Barangay East Bajac-Bajac", "Barangay Gordon Heights", "Barangay Old Cabalan", "Barangay Santa Rita"],
            "Iba": ["Barangay Amungan", "Barangay Lipay-Dingin", "Barangay Palanginan", "Barangay San Agustin", "Barangay Santo Rosario"],
            "Subic": ["Barangay Asinan", "Barangay Baraca-Camachile", "Barangay Calapandayan", "Barangay Matain", "Barangay Santo Tomas"],
            "San Antonio": ["Barangay Antipolo", "Barangay Burgos", "Barangay Poblacion", "Barangay San Juan", "Barangay San Miguel"],
            "Castillejos": ["Barangay Buenavista", "Barangay Nagbayan", "Barangay Nagbunga", "Barangay San Agustin", "Barangay San Pablo"]
        }
    },

    // REGION 4: Western Visayas
    "Western Visayas (Region VI)": {
        "Iloilo": {
            "Iloilo City": ["Barangay Balantang", "Barangay Buhang", "Barangay Molo", "Barangay San Pedro", "Barangay Tanza"],
            "Oton": ["Barangay Alegre", "Barangay Bita", "Barangay Caboloan", "Barangay Poblacion South", "Barangay Trapiche"],
            "Pavia": ["Barangay Anilao", "Barangay Jaro", "Barangay Pagsanga-an", "Barangay Pandac", "Barangay Ungka"],
            "Santa Barbara": ["Barangay Bagumbayan", "Barangay Buyo", "Barangay Cabugao Norte", "Barangay Lanag", "Barangay Tuburan"],
            "San Miguel": ["Barangay Bagacay", "Barangay Consolacion", "Barangay Ilajas", "Barangay San Jose", "Barangay Tacuyong Norte"]
        },
        "Negros Occidental": {
            "Bacolod": ["Barangay Alangilan", "Barangay Estefania", "Barangay Granada", "Barangay Mansilingan", "Barangay Tangub"],
            "Silay": ["Barangay Balaring", "Barangay Guimbala-on", "Barangay Hawaiian", "Barangay Lantad", "Barangay Rizal"],
            "Talisay": ["Barangay Cabatangan", "Barangay Concepcion", "Barangay Dos Hermanas", "Barangay Matab-ang", "Barangay Zone 12"],
            "Cadiz": ["Barangay Caduhaan", "Barangay Caduha-an", "Barangay Central Poblacion", "Barangay Luna", "Barangay Zone 2"],
            "Bago": ["Barangay Atipuluan", "Barangay Binubuhan", "Barangay Ma-ao", "Barangay Sampinit", "Barangay Tabunan"]
        },
        "Capiz": {
            "Roxas City": ["Barangay Balijuagan", "Barangay Banica", "Barangay Culasi", "Barangay Inzo Arnaldo", "Barangay Lawa-an"],
            "Panay": ["Barangay Agbalo", "Barangay Binangig", "Barangay Daga", "Barangay Mesa", "Barangay Poblacion"],
            "Pontevedra": ["Barangay Agunit", "Barangay Hipona", "Barangay Lantangan", "Barangay Malag-it", "Barangay Tacas"],
            "Dao": ["Barangay Agtambo", "Barangay Balucuan", "Barangay Manhoy", "Barangay Matagnop", "Barangay Poblacion"],
            "Dumalag": ["Barangay Concepcion", "Barangay Dolores", "Barangay Jalbuena", "Barangay San Martin", "Barangay Santa Cruz"]
        },
        "Aklan": {
            "Kalibo": ["Barangay Andagao", "Barangay Estancia", "Barangay Mobo", "Barangay Poblacion", "Barangay Tigayon"],
            "Boracay (Malay)": ["Barangay Balabag", "Barangay Manoc-Manoc", "Barangay Yapak", "Barangay Argao", "Barangay Cubay"],
            "Banga": ["Barangay Agbobolo", "Barangay Cupang", "Barangay Libas", "Barangay Poblacion", "Barangay Tabyawan"],
            "Ibajay": ["Barangay Aquino", "Barangay Capilijan", "Barangay Laguinbanua", "Barangay Poblacion", "Barangay San Jose"],
            "New Washington": ["Barangay Dumaguit", "Barangay Guinbaliwan", "Barangay Jugas", "Barangay Poblacion", "Barangay Polo"]
        },
        "Antique": {
            "San Jose": ["Barangay Barangan", "Barangay Funda-Dalipe", "Barangay Madrangca", "Barangay San Angel", "Barangay San Pedro"],
            "Sibalom": ["Barangay Bongbongan", "Barangay Cabladan", "Barangay Iglinab", "Barangay Poblacion", "Barangay Tigbalua"],
            "Culasi": ["Barangay Alojipan", "Barangay Buenavista", "Barangay Flores", "Barangay Malacañang", "Barangay Poblacion"],
            "Hamtic": ["Barangay Bantayan", "Barangay Fabrica", "Barangay Linaban", "Barangay Piapi", "Barangay Poblacion"],
            "Bugasong": ["Barangay Bagtason", "Barangay Cubay South", "Barangay Jinalinan", "Barangay Pangalcagan", "Barangay Poblacion"]
        }
    },

    // REGION 5: Mindanao
    "Davao Region (Region XI)": {
        "Davao del Sur": {
            "Davao City": ["Barangay Buhangin", "Barangay Catalunan Grande", "Barangay Matina", "Barangay Talomo", "Barangay Toril"],
            "Digos": ["Barangay Aplaya", "Barangay Cogon", "Barangay Matti", "Barangay Soong", "Barangay Tres de Mayo"],
            "Bansalan": ["Barangay Alegre", "Barangay Bitaug", "Barangay Magsaysay", "Barangay Poblacion", "Barangay Tubod"],
            "Hagonoy": ["Barangay Aplaya", "Barangay Balutakay", "Barangay Guihing", "Barangay Poblacion", "Barangay Sacub"],
            "Padada": ["Barangay Harada Butay", "Barangay Lower Malinao", "Barangay Palili", "Barangay Poblacion", "Barangay San Isidro"]
        },
        "Davao del Norte": {
            "Tagum": ["Barangay Apokon", "Barangay Bincungan", "Barangay Mankilam", "Barangay Pagsabangan", "Barangay Visayan Village"],
            "Panabo": ["Barangay Dapco", "Barangay Gredu", "Barangay Mabunao", "Barangay New Malaga", "Barangay San Francisco"],
            "Samal": ["Barangay Camudmud", "Barangay Kinawitnon", "Barangay Penaplata", "Barangay San Isidro", "Barangay Tagbitan-ag"],
            "Kapalong": ["Barangay Capungagan", "Barangay Florida", "Barangay Gabuyan", "Barangay Mamacao", "Barangay Semong"],
            "New Corella": ["Barangay Cabidianan", "Barangay Limbaan", "Barangay Mesaoy", "Barangay Patrocenio", "Barangay San Roque"]
        },
        "Davao Oriental": {
            "Mati": ["Barangay Badas", "Barangay Central", "Barangay Dahican", "Barangay Don Salvador Lopez", "Barangay Macambol"],
            "Baganga": ["Barangay Batawan", "Barangay Campawan", "Barangay Kinablangan", "Barangay Poblacion", "Barangay Salingcomot"],
            "Caraga": ["Barangay Caningag", "Barangay Lamiawan", "Barangay Manorigao", "Barangay Poblacion", "Barangay Santiago"],
            "Lupon": ["Barangay Calapagan", "Barangay Ilangay", "Barangay Mabini", "Barangay Poblacion", "Barangay San Isidro"],
            "Tarragona": ["Barangay Cabagayan", "Barangay Central", "Barangay Lucatan", "Barangay Ompao", "Barangay Tomoaong"]
        },
        "Davao de Oro": {
            "Nabunturan": ["Barangay Anislagan", "Barangay Libay-Libay", "Barangay Magsaysay", "Barangay New Sibonga", "Barangay Poblacion"],
            "Maco": ["Barangay Anibongan", "Barangay Calabcab", "Barangay Mainit", "Barangay New Barili", "Barangay Taglawig"],
            "Mawab": ["Barangay Andili", "Barangay Bawani", "Barangay Nueva Visayas", "Barangay Poblacion", "Barangay Salvacion"],
            "Monkayo": ["Barangay Banlag", "Barangay Casoon", "Barangay Haguimitan", "Barangay Poblacion", "Barangay Upper Ulip"],
            "New Bataan": ["Barangay Andap", "Barangay Cabinuangan", "Barangay Katipunan", "Barangay Poblacion", "Barangay San Roque"]
        },
        "Davao Occidental": {
            "Malita": ["Barangay Bito", "Barangay Buhangin", "Barangay Kinabentan", "Barangay New Argao", "Barangay Poblacion"],
            "Santa Maria": ["Barangay Basiawan", "Barangay Kidadan", "Barangay Pongpong", "Barangay San Agustin", "Barangay Tanglad"],
            "Don Marcelino": ["Barangay Calian", "Barangay Kinanga", "Barangay Lawa", "Barangay Nueva Villa", "Barangay South Lamidan"],
            "Jose Abad Santos": ["Barangay Bukid", "Barangay Caburan", "Barangay Culaman", "Barangay Malalan", "Barangay Sugal"],
            "Sarangani": ["Barangay Camahual", "Barangay Malalag", "Barangay Patuco", "Barangay Poblacion", "Barangay Tagen"]
        }
    }
};

    // Get form elements
    const registrationForm = document.getElementById('registrationForm');
    if (!registrationForm) return; // Exit if we're not on registration page
    
    const regionSelect = document.getElementById('region');
    const provinceSelect = document.getElementById('province');
    const municipalitySelect = document.getElementById('municipality');
    const barangaySelect = document.getElementById('barangay');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    
    // Populate regions
    for (const region in addressData) {
        const option = document.createElement('option');
        option.value = region;
        option.textContent = region;
        regionSelect.appendChild(option);
    }

    // Region change event
    regionSelect.addEventListener('change', function() {
        // Reset child dropdowns
        provinceSelect.innerHTML = '<option value="">Select Province</option>';
        municipalitySelect.innerHTML = '<option value="">Select Municipality</option>';
        barangaySelect.innerHTML = '<option value="">Select Barangay</option>';
        
        // Disable child dropdowns if no selection
        if (this.value === '') {
            provinceSelect.disabled = true;
            municipalitySelect.disabled = true;
            barangaySelect.disabled = true;
            return;
        }
        
        // Enable and populate provinces
        provinceSelect.disabled = false;
        const provinces = addressData[this.value];
        for (const province in provinces) {
            const option = document.createElement('option');
            option.value = province;
            option.textContent = province;
            provinceSelect.appendChild(option);
        }
    });

    // Province change event
    provinceSelect.addEventListener('change', function() {
        // Reset child dropdowns
        municipalitySelect.innerHTML = '<option value="">Select Municipality</option>';
        barangaySelect.innerHTML = '<option value="">Select Barangay</option>';
        
        // Disable child dropdowns if no selection
        if (this.value === '') {
            municipalitySelect.disabled = true;
            barangaySelect.disabled = true;
            return;
        }
        
        // Enable and populate municipalities
        municipalitySelect.disabled = false;
        const municipalities = addressData[regionSelect.value][this.value];
        for (const municipality in municipalities) {
            const option = document.createElement('option');
            option.value = municipality;
            option.textContent = municipality;
            municipalitySelect.appendChild(option);
        }
    });

    // Municipality change event
    municipalitySelect.addEventListener('change', function() {
        // Reset barangay dropdown
        barangaySelect.innerHTML = '<option value="">Select Barangay</option>';
        
        // Disable barangay dropdown if no selection
        if (this.value === '') {
            barangaySelect.disabled = true;
            return;
        }
        
        // Enable and populate barangays
        barangaySelect.disabled = false;
        const barangays = addressData[regionSelect.value][provinceSelect.value][this.value];
        barangays.forEach(barangay => {
            const option = document.createElement('option');
            option.value = barangay;
            option.textContent = barangay;
            barangaySelect.appendChild(option);
        });
    });

    // Form validation
    if (registrationForm) {
        registrationForm.addEventListener('submit', function(e) {
            let isValid = true;
            
            // Clear previous error messages
            const errorElements = document.querySelectorAll('.error');
            errorElements.forEach(element => element.remove());
            
            // Remove error class
            const formInputs = document.querySelectorAll('input, select');
            formInputs.forEach(input => input.classList.remove('input-error'));
            
            // Validate required fields
            formInputs.forEach(input => {
                if (input.required && input.value.trim() === '') {
                    isValid = false;
                    markInvalid(input, 'This field is required');
                }
            });
            
            // Validate email format
            const emailInput = document.getElementById('email');
            if (emailInput && emailInput.value.trim() !== '') {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(emailInput.value.trim())) {
                    isValid = false;
                    markInvalid(emailInput, 'Please enter a valid email address');
                }
            }
            
            // Validate phone number format
            const phoneInput = document.getElementById('phoneNumber');
            if (phoneInput && phoneInput.value.trim() !== '') {
                // Allowing formats like: +63 912 345 6789, 09123456789, etc.
                const phoneRegex = /^(\+\d{1,3}\s?)?\d{10,12}$/;
                if (!phoneRegex.test(phoneInput.value.replace(/\s+/g, ''))) {
                    isValid = false;
                    markInvalid(phoneInput, 'Please enter a valid phone number');
                }
            }
            
            // Validate password strength
            if (passwordInput && passwordInput.value.trim() !== '') {
                // Check if password meets requirements
                const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
                if (!passwordRegex.test(passwordInput.value)) {
                    isValid = false;
                    markInvalid(passwordInput, 'Password must be at least 8 characters and include uppercase, lowercase, number, and special character');
                }
            }
            
            // Validate password match
            if (passwordInput && confirmPasswordInput && 
                passwordInput.value.trim() !== '' && confirmPasswordInput.value.trim() !== '') {
                if (passwordInput.value !== confirmPasswordInput.value) {
                    isValid = false;
                    markInvalid(confirmPasswordInput, 'Passwords do not match');
                }
            }
            
            // Prevent form submission if there are errors
            if (!isValid) {
                e.preventDefault();
            }
        });
    }
    
    // Login form validation
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            let isValid = true;
            
            // Clear previous error messages
            const errorElements = document.querySelectorAll('.error');
            errorElements.forEach(element => element.remove());
            
            // Remove error class
            const formInputs = document.querySelectorAll('input');
            formInputs.forEach(input => input.classList.remove('input-error'));
            
            // Validate required fields
            formInputs.forEach(input => {
                if (input.required && input.value.trim() === '') {
                    isValid = false;
                    markInvalid(input, 'This field is required');
                }
            });
            
            // Prevent form submission if there are errors
            if (!isValid) {
                e.preventDefault();
            }
        });
    }
    
    // Helper function to mark invalid fields
    function markInvalid(element, message) {
        element.classList.add('input-error');
        const errorElement = document.createElement('div');
        errorElement.className = 'error';
        errorElement.textContent = message;
        element.parentNode.appendChild(errorElement);
    }
});
