<template>
  <div class="test-data-generator">
    <!-- Disclaimer RGPD -->
    <div class="bg-blue-500/10 border border-blue-500/30 rounded-lg sm:rounded-xl p-3 sm:p-4 mb-4 sm:mb-6">
      <div class="flex items-start gap-2 sm:gap-3">
        <svg class="w-5 h-5 sm:w-6 sm:h-6 text-blue-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        <div>
          <h4 class="text-blue-300 font-bold text-sm sm:text-base mb-1">⚖️ Utilisation Légale Uniquement</h4>
          <p class="text-blue-200/80 text-xs sm:text-sm leading-relaxed">
            Cet outil génère des <strong>données factices aléatoires</strong> exclusivement pour les <strong>tests de développement</strong>.
            Les identités générées sont totalement fictives et ne correspondent à aucune personne réelle.
            Conforme RGPD - Aucune donnée personnelle réelle n'est utilisée ou stockée.
          </p>
        </div>
      </div>
    </div>

    <!-- Configuration -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-4 sm:mb-6">
      <div class="bg-white/10 rounded-lg p-3 sm:p-4">
        <label class="block text-white mb-2 font-semibold text-sm sm:text-base">Nombre de fiches</label>
        <input
          v-model.number="count"
          type="number"
          min="1"
          max="100"
          class="w-full bg-gray-800 text-white px-3 sm:px-4 py-2 rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none text-sm sm:text-base"
        />
      </div>

      <div class="bg-white/10 rounded-lg p-3 sm:p-4">
        <label class="block text-white mb-2 font-semibold text-sm sm:text-base">Nationalité</label>
        <select
          v-model="nationality"
          class="w-full bg-gray-800 text-white px-3 sm:px-4 py-2 rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none text-sm sm:text-base"
        >
          <option value="FR">🇫🇷 France</option>
          <option value="US">🇺🇸 États-Unis</option>
          <option value="GB">🇬🇧 Royaume-Uni</option>
          <option value="DE">🇩🇪 Allemagne</option>
          <option value="ES">🇪🇸 Espagne</option>
          <option value="IT">🇮🇹 Italie</option>
          <option value="BF">🇧🇫 Burkina Faso</option>
          <option value="SN">🇸🇳 Sénégal</option>
          <option value="CI">🇨🇮 Côte d'Ivoire</option>
          <option value="CM">🇨🇲 Cameroun</option>
        </select>
      </div>

      <div class="bg-white/10 rounded-lg p-3 sm:p-4">
        <label class="block text-white mb-2 font-semibold text-sm sm:text-base">Genre</label>
        <select
          v-model="gender"
          class="w-full bg-gray-800 text-white px-3 sm:px-4 py-2 rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none text-sm sm:text-base"
        >
          <option value="all">Mixte</option>
          <option value="male">Masculin</option>
          <option value="female">Féminin</option>
        </select>
      </div>

      <div class="bg-white/10 rounded-lg p-3 sm:p-4">
        <label class="block text-white mb-2 font-semibold text-sm sm:text-base">Format export</label>
        <select
          v-model="exportFormat"
          class="w-full bg-gray-800 text-white px-3 sm:px-4 py-2 rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none text-sm sm:text-base"
        >
          <option value="json">JSON</option>
          <option value="csv">CSV</option>
          <option value="sql">SQL</option>
        </select>
      </div>
    </div>

    <!-- Actions -->
    <div class="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 mb-6 sm:mb-8">
      <button
        @click="generateProfiles"
        :disabled="loading"
        class="bg-gradient-to-r from-blue-500 to-purple-500 hover:shadow-lg disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed text-white px-6 sm:px-8 py-3 rounded-lg font-bold transition-all text-sm sm:text-base"
      >
        {{ loading ? '⏳ Génération...' : '🎲 Générer des Profils' }}
      </button>
      
      <button
        @click="downloadData"
        :disabled="profiles.length === 0"
        class="bg-green-500 hover:bg-green-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white px-6 sm:px-8 py-3 rounded-lg font-semibold transition-colors text-sm sm:text-base"
      >
        📥 Télécharger ({{ exportFormat.toUpperCase() }})
      </button>

      <button
        @click="clearProfiles"
        :disabled="profiles.length === 0"
        class="bg-red-500 hover:bg-red-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white px-6 sm:px-8 py-3 rounded-lg font-semibold transition-colors text-sm sm:text-base"
      >
        🗑️ Effacer
      </button>
    </div>

    <!-- Profiles Grid -->
    <div v-if="profiles.length > 0" class="space-y-3 sm:space-y-4">
      <div class="flex items-center justify-between mb-3 sm:mb-4">
        <h3 class="text-lg sm:text-xl font-bold text-white">
          📋 {{ profiles.length }} Profil{{ profiles.length > 1 ? 's' : '' }} Généré{{ profiles.length > 1 ? 's' : '' }}
        </h3>
        <div class="text-sm text-gray-400">
          Données 100% factices
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4">
        <div
          v-for="(profile, index) in profiles"
          :key="index"
          class="bg-white/5 backdrop-blur-lg border border-white/10 rounded-lg sm:rounded-xl p-4 sm:p-6 hover:bg-white/10 transition-all"
        >
          <!-- Avatar -->
          <div class="flex items-start gap-3 sm:gap-4 mb-4">
            <div class="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white text-xl sm:text-2xl font-bold flex-shrink-0">
              {{ profile.firstName.charAt(0) }}{{ profile.lastName.charAt(0) }}
            </div>
            <div class="flex-1 min-w-0">
              <h4 class="text-base sm:text-lg font-bold text-white truncate">
                {{ profile.firstName }} {{ profile.lastName }}
              </h4>
              <p class="text-xs sm:text-sm text-gray-400">{{ profile.gender === 'male' ? '👨 Masculin' : '👩 Féminin' }}</p>
            </div>
          </div>

          <!-- Info -->
          <div class="space-y-2 sm:space-y-3">
            <div class="flex items-start gap-2">
              <span class="text-gray-400 text-xs sm:text-sm w-20 flex-shrink-0">📧 Email:</span>
              <span class="text-white text-xs sm:text-sm break-all">{{ profile.email }}</span>
            </div>
            <div class="flex items-start gap-2">
              <span class="text-gray-400 text-xs sm:text-sm w-20 flex-shrink-0">📱 Tél:</span>
              <span class="text-white text-xs sm:text-sm">{{ profile.phone }}</span>
            </div>
            <div class="flex items-start gap-2">
              <span class="text-gray-400 text-xs sm:text-sm w-20 flex-shrink-0">📍 Ville:</span>
              <span class="text-white text-xs sm:text-sm">{{ profile.city }}, {{ profile.country }}</span>
            </div>
            <div class="flex items-start gap-2">
              <span class="text-gray-400 text-xs sm:text-sm w-20 flex-shrink-0">🎂 Né(e) le:</span>
              <span class="text-white text-xs sm:text-sm">{{ formatDate(profile.birthDate) }} ({{ profile.age }} ans)</span>
            </div>
          </div>

          <!-- Copy button -->
          <button
            @click="copyProfile(profile)"
            class="w-full mt-4 bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-colors"
          >
            📋 Copier JSON
          </button>
        </div>
      </div>
    </div>

    <!-- Empty state -->
    <div v-else class="text-center py-12 sm:py-20">
      <div class="text-5xl sm:text-6xl mb-4">👤</div>
      <p class="text-lg sm:text-xl text-gray-300 mb-2">Aucun profil généré</p>
      <p class="text-sm sm:text-base text-gray-500">Configurez les paramètres et cliquez sur "Générer"</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const count = ref(5)
const nationality = ref('FR')
const gender = ref('all')
const exportFormat = ref('json')
const loading = ref(false)
const profiles = ref([])

// Données pour la génération aléatoire
const names = {
  FR: {
    male: {
      first: ['Lucas', 'Hugo', 'Louis', 'Gabriel', 'Arthur', 'Jules', 'Raphaël', 'Adam', 'Noah', 'Léo'],
      last: ['Martin', 'Bernard', 'Dubois', 'Thomas', 'Robert', 'Richard', 'Petit', 'Durand', 'Leroy', 'Moreau']
    },
    female: {
      first: ['Emma', 'Jade', 'Louise', 'Alice', 'Chloé', 'Léa', 'Manon', 'Clara', 'Camille', 'Sarah'],
      last: ['Martin', 'Bernard', 'Dubois', 'Thomas', 'Robert', 'Richard', 'Petit', 'Durand', 'Leroy', 'Moreau']
    }
  },
  US: {
    male: {
      first: ['James', 'John', 'Robert', 'Michael', 'William', 'David', 'Richard', 'Joseph', 'Thomas', 'Charles'],
      last: ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez']
    },
    female: {
      first: ['Mary', 'Patricia', 'Jennifer', 'Linda', 'Elizabeth', 'Barbara', 'Susan', 'Jessica', 'Sarah', 'Karen'],
      last: ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez']
    }
  },
  GB: {
    male: {
      first: ['Oliver', 'George', 'Harry', 'Jack', 'Jacob', 'Noah', 'Charlie', 'Muhammad', 'Thomas', 'Oscar'],
      last: ['Smith', 'Jones', 'Taylor', 'Brown', 'Williams', 'Wilson', 'Johnson', 'Davies', 'Robinson', 'Wright']
    },
    female: {
      first: ['Olivia', 'Amelia', 'Isla', 'Ava', 'Emily', 'Isabella', 'Mia', 'Poppy', 'Ella', 'Lily'],
      last: ['Smith', 'Jones', 'Taylor', 'Brown', 'Williams', 'Wilson', 'Johnson', 'Davies', 'Robinson', 'Wright']
    }
  },
  DE: {
    male: {
      first: ['Ben', 'Paul', 'Leon', 'Finn', 'Jonas', 'Noah', 'Elias', 'Luis', 'Lukas', 'Felix'],
      last: ['Müller', 'Schmidt', 'Schneider', 'Fischer', 'Weber', 'Meyer', 'Wagner', 'Becker', 'Schulz', 'Hoffmann']
    },
    female: {
      first: ['Mia', 'Emma', 'Hannah', 'Sofia', 'Anna', 'Emilia', 'Lina', 'Marie', 'Lena', 'Mila'],
      last: ['Müller', 'Schmidt', 'Schneider', 'Fischer', 'Weber', 'Meyer', 'Wagner', 'Becker', 'Schulz', 'Hoffmann']
    }
  },
  ES: {
    male: {
      first: ['Hugo', 'Martín', 'Lucas', 'Mateo', 'Leo', 'Daniel', 'Alejandro', 'Pablo', 'Manuel', 'Álvaro'],
      last: ['García', 'Rodríguez', 'González', 'Fernández', 'López', 'Martínez', 'Sánchez', 'Pérez', 'Gómez', 'Martín']
    },
    female: {
      first: ['Lucía', 'María', 'Martina', 'Paula', 'Sofía', 'Julia', 'Emma', 'Daniela', 'Valeria', 'Alba'],
      last: ['García', 'Rodríguez', 'González', 'Fernández', 'López', 'Martínez', 'Sánchez', 'Pérez', 'Gómez', 'Martín']
    }
  },
  IT: {
    male: {
      first: ['Francesco', 'Alessandro', 'Lorenzo', 'Leonardo', 'Andrea', 'Mattia', 'Gabriele', 'Tommaso', 'Riccardo', 'Davide'],
      last: ['Rossi', 'Russo', 'Ferrari', 'Esposito', 'Bianchi', 'Romano', 'Colombo', 'Ricci', 'Marino', 'Greco']
    },
    female: {
      first: ['Sofia', 'Giulia', 'Aurora', 'Alice', 'Ginevra', 'Emma', 'Giorgia', 'Greta', 'Beatrice', 'Anna'],
      last: ['Rossi', 'Russo', 'Ferrari', 'Esposito', 'Bianchi', 'Romano', 'Colombo', 'Ricci', 'Marino', 'Greco']
    }
  },
  BF: {
    male: {
      first: ['Abdoulaye', 'Ibrahim', 'Moussa', 'Ousmane', 'Souleymane', 'Amadou', 'Issouf', 'Adama', 'Boureima', 'Karim'],
      last: ['Ouédraogo', 'Sawadogo', 'Compaoré', 'Traoré', 'Kaboré', 'Zoungrana', 'Sangaré', 'Ouattara', 'Tapsoba', 'Zongo']
    },
    female: {
      first: ['Aminata', 'Fatoumata', 'Mariam', 'Aïssata', 'Salimata', 'Rokia', 'Adama', 'Safiatou', 'Hawa', 'Assétou'],
      last: ['Ouédraogo', 'Sawadogo', 'Compaoré', 'Traoré', 'Kaboré', 'Zoungrana', 'Sangaré', 'Ouattara', 'Tapsoba', 'Zongo']
    }
  },
  SN: {
    male: {
      first: ['Mamadou', 'Moussa', 'Ibrahima', 'Cheikh', 'Ousmane', 'Amadou', 'Abdoulaye', 'Omar', 'Saliou', 'Malick'],
      last: ['Diop', 'Ndiaye', 'Sow', 'Fall', 'Diallo', 'Ba', 'Cissé', 'Sarr', 'Sy', 'Diouf']
    },
    female: {
      first: ['Fatou', 'Awa', 'Aïssatou', 'Mariama', 'Khady', 'Bineta', 'Ndèye', 'Rokhaya', 'Astou', 'Coumba'],
      last: ['Diop', 'Ndiaye', 'Sow', 'Fall', 'Diallo', 'Ba', 'Cissé', 'Sarr', 'Sy', 'Diouf']
    }
  },
  CI: {
    male: {
      first: ['Kouadio', 'Koffi', 'Yao', 'N\'guessan', 'Konan', 'Kouassi', 'Brou', 'Aké', 'Kouamé', 'Kakou'],
      last: ['Yao', 'Kouassi', 'Koné', 'Traoré', 'Ouattara', 'Diallo', 'Touré', 'Camara', 'Bamba', 'Sangaré']
    },
    female: {
      first: ['Adjoua', 'Akissi', 'Amenan', 'Affoué', 'Aya', 'Mariam', 'Aminata', 'Fatoumata', 'Véronique', 'Marie'],
      last: ['Yao', 'Kouassi', 'Koné', 'Traoré', 'Ouattara', 'Diallo', 'Touré', 'Camara', 'Bamba', 'Sangaré']
    }
  },
  CM: {
    male: {
      first: ['Emmanuel', 'Paul', 'Jean', 'Pierre', 'André', 'François', 'Marcel', 'Jacques', 'Alain', 'Patrick'],
      last: ['Nguyen', 'Mbarga', 'Nkomo', 'Tchoua', 'Fouda', 'Abena', 'Ondoa', 'Bella', 'Ebong', 'Essomba']
    },
    female: {
      first: ['Marie', 'Jeanne', 'Françoise', 'Thérèse', 'Charlotte', 'Élisabeth', 'Catherine', 'Sylvie', 'Jacqueline', 'Nadège'],
      last: ['Nguyen', 'Mbarga', 'Nkomo', 'Tchoua', 'Fouda', 'Abena', 'Ondoa', 'Bella', 'Ebong', 'Essomba']
    }
  }
}

const cities = {
  FR: ['Paris', 'Lyon', 'Marseille', 'Toulouse', 'Nice', 'Nantes', 'Bordeaux', 'Lille', 'Rennes', 'Strasbourg'],
  US: ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix', 'Philadelphia', 'San Antonio', 'San Diego', 'Dallas', 'San Jose'],
  GB: ['London', 'Birmingham', 'Leeds', 'Glasgow', 'Sheffield', 'Manchester', 'Edinburgh', 'Liverpool', 'Bristol', 'Cardiff'],
  DE: ['Berlin', 'Hamburg', 'München', 'Köln', 'Frankfurt', 'Stuttgart', 'Düsseldorf', 'Dortmund', 'Essen', 'Leipzig'],
  ES: ['Madrid', 'Barcelona', 'Valencia', 'Sevilla', 'Zaragoza', 'Málaga', 'Murcia', 'Palma', 'Bilbao', 'Alicante'],
  IT: ['Roma', 'Milano', 'Napoli', 'Torino', 'Palermo', 'Genova', 'Bologna', 'Firenze', 'Bari', 'Catania'],
  BF: ['Ouagadougou', 'Bobo-Dioulasso', 'Koudougou', 'Ouahigouya', 'Banfora', 'Dédougou', 'Kaya', 'Tenkodogo', 'Fada N\'gourma', 'Houndé'],
  SN: ['Dakar', 'Thiès', 'Kaolack', 'Saint-Louis', 'Ziguinchor', 'Rufisque', 'Mbour', 'Louga', 'Diourbel', 'Tambacounda'],
  CI: ['Abidjan', 'Bouaké', 'Daloa', 'Yamoussoukro', 'San-Pédro', 'Korhogo', 'Man', 'Gagnoa', 'Divo', 'Abengourou'],
  CM: ['Yaoundé', 'Douala', 'Garoua', 'Bamenda', 'Bafoussam', 'Maroua', 'Ngaoundéré', 'Bertoua', 'Limbé', 'Kribi']
}

const emailDomains = {
  default: ['gmail.com', 'outlook.com', 'yahoo.com', 'hotmail.com', 'icloud.com', 'protonmail.com'],
  BF: ['gmail.com', 'yahoo.fr', 'hotmail.com', 'fasonet.bf', 'orange.bf'],
  SN: ['gmail.com', 'yahoo.fr', 'hotmail.com', 'orange.sn', 'arc.sn'],
  CI: ['gmail.com', 'yahoo.fr', 'hotmail.com', 'orange.ci', 'aviso.ci'],
  CM: ['gmail.com', 'yahoo.fr', 'hotmail.com', 'orange.cm', 'camnet.cm']
}

const countryNames = {
  FR: 'France',
  US: 'États-Unis',
  GB: 'Royaume-Uni',
  DE: 'Allemagne',
  ES: 'Espagne',
  IT: 'Italie',
  BF: 'Burkina Faso',
  SN: 'Sénégal',
  CI: 'Côte d\'Ivoire',
  CM: 'Cameroun'
}

function randomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)]
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function generatePhone(country) {
  const formats = {
    FR: () => `+33 ${randomInt(6, 7)} ${randomInt(10, 99)} ${randomInt(10, 99)} ${randomInt(10, 99)} ${randomInt(10, 99)}`,
    US: () => `+1 ${randomInt(200, 999)}-${randomInt(200, 999)}-${randomInt(1000, 9999)}`,
    GB: () => `+44 ${randomInt(1000, 9999)} ${randomInt(100000, 999999)}`,
    DE: () => `+49 ${randomInt(100, 999)} ${randomInt(1000000, 9999999)}`,
    ES: () => `+34 ${randomInt(600, 799)} ${randomInt(100, 999)} ${randomInt(100, 999)}`,
    IT: () => `+39 ${randomInt(300, 399)} ${randomInt(1000000, 9999999)}`,
    BF: () => `+226 ${randomInt(50, 79)} ${randomInt(10, 99)} ${randomInt(10, 99)} ${randomInt(10, 99)}`,
    SN: () => `+221 ${randomInt(70, 78)} ${randomInt(100, 999)} ${randomInt(10, 99)} ${randomInt(10, 99)}`,
    CI: () => `+225 ${randomInt(40, 89)} ${randomInt(10, 99)} ${randomInt(10, 99)} ${randomInt(10, 99)}`,
    CM: () => `+237 6 ${randomInt(50, 99)} ${randomInt(10, 99)} ${randomInt(10, 99)} ${randomInt(10, 99)}`
  }
  return formats[country]()
}

function generateEmail(firstName, lastName, country) {
  const normalized = (str) => str.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
  const variants = [
    `${normalized(firstName)}.${normalized(lastName)}`,
    `${normalized(firstName)}${normalized(lastName)}`,
    `${normalized(firstName)}_${normalized(lastName)}`,
    `${normalized(firstName)}${randomInt(1, 99)}`
  ]
  const domains = emailDomains[country] || emailDomains.default
  return `${randomItem(variants)}@${randomItem(domains)}`
}

function generateBirthDate() {
  const year = randomInt(1960, 2005)
  const month = randomInt(1, 12)
  const day = randomInt(1, 28)
  return new Date(year, month - 1, day)
}

function calculateAge(birthDate) {
  const today = new Date()
  let age = today.getFullYear() - birthDate.getFullYear()
  const monthDiff = today.getMonth() - birthDate.getMonth()
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--
  }
  return age
}

function formatDate(date) {
  return date.toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' })
}

async function generateProfiles() {
  loading.value = true
  profiles.value = []

  await new Promise(resolve => setTimeout(resolve, 500))

  for (let i = 0; i < count.value; i++) {
    const selectedGender = gender.value === 'all' 
      ? (Math.random() > 0.5 ? 'male' : 'female')
      : gender.value

    const nameData = names[nationality.value][selectedGender]
    const firstName = randomItem(nameData.first)
    const lastName = randomItem(nameData.last)
    const birthDate = generateBirthDate()

    profiles.value.push({
      id: `TEST-${Date.now()}-${i}`,
      firstName,
      lastName,
      gender: selectedGender,
      email: generateEmail(firstName, lastName, nationality.value),
      phone: generatePhone(nationality.value),
      birthDate,
      age: calculateAge(birthDate),
      city: randomItem(cities[nationality.value]),
      country: countryNames[nationality.value],
      nationality: nationality.value
    })
  }

  loading.value = false
}

function copyProfile(profile) {
  const text = JSON.stringify(profile, null, 2)
  navigator.clipboard.writeText(text)
  alert('✅ Profil copié dans le presse-papier!')
}

function downloadData() {
  let content = ''
  let filename = ''
  let mimeType = ''

  if (exportFormat.value === 'json') {
    content = JSON.stringify(profiles.value, null, 2)
    filename = `test-profiles-${Date.now()}.json`
    mimeType = 'application/json'
  } else if (exportFormat.value === 'csv') {
    const headers = ['ID', 'Prénom', 'Nom', 'Genre', 'Email', 'Téléphone', 'Date de naissance', 'Âge', 'Ville', 'Pays']
    const rows = profiles.value.map(p => [
      p.id,
      p.firstName,
      p.lastName,
      p.gender === 'male' ? 'Masculin' : 'Féminin',
      p.email,
      p.phone,
      formatDate(p.birthDate),
      p.age,
      p.city,
      p.country
    ])
    content = [headers, ...rows].map(row => row.join(',')).join('\n')
    filename = `test-profiles-${Date.now()}.csv`
    mimeType = 'text/csv'
  } else if (exportFormat.value === 'sql') {
    const inserts = profiles.value.map(p => 
      `INSERT INTO test_users (id, first_name, last_name, gender, email, phone, birth_date, age, city, country) VALUES ('${p.id}', '${p.firstName}', '${p.lastName}', '${p.gender}', '${p.email}', '${p.phone}', '${p.birthDate.toISOString().split('T')[0]}', ${p.age}, '${p.city}', '${p.country}');`
    ).join('\n')
    content = `-- Données de test générées le ${new Date().toLocaleString('fr-FR')}\n-- ATTENTION: Données factices pour tests uniquement\n\n${inserts}`
    filename = `test-profiles-${Date.now()}.sql`
    mimeType = 'text/plain'
  }

  const blob = new Blob([content], { type: mimeType })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

function clearProfiles() {
  if (confirm('Êtes-vous sûr de vouloir effacer tous les profils générés ?')) {
    profiles.value = []
  }
}
</script>

<style scoped>
.test-data-generator {
  animation: fadeIn 0.5s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
