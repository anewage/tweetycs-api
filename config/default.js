module.exports = {
  port: 2000,
  bakjs: {
    saveTweet: 'http://bak:3000/api/tweet/save',
    getAggregateUsers: 'http://bak:3000/api/aggregate/users',
    getAggregateTopics: 'http://bak:3000/api/aggregate/topics'
  },
  namespace: '/tweetycs',
  twit: {
    consumer_key: '',
    consumer_secret: '',
    access_token: '',
    access_token_secret: '',
    tweet_mode: 'extended'
  },
  flask: {
    mlapp_uri: 'http://flask:5000/',
    dlapp_uri: 'http://flask:5001/'
  },
  IBM: {
    api_key: '',
    url: ''
  },
  keywords: [],
  channels: {
    neoplasms: {
      title: 'Cancers - Neoplasms',
      keywords: [
        'Pharyngeal Cancer',
        'Esophageal Cancer',
        'Prostate Cancer',
        'Gallbladder Cancer',
        'Trachea cancer',
        'Kidney cancer',
        'Laryngeal cancer',
        'Liver cancer',
        'Urinary Organ Cancer',
        'Lung Cancer',
        'Stomach Cancer',
        'Uterine Cancer',
        'Mouth Cancer',
        'Biliary Tract Cancer',
        'Bladder Cancer',
        'Brain Cancer',
        'Breast Cancer',
        'Nasopharyngeal Cancer',
        'Cervical Cancer',
        'Nervous System Cancer',
        'Oropharyngeal Cancer',
        'Colon Cancer',
        'Ovarian Cancer',
        'Pancreatic Cancer',
        'Non-Hodgkin Lymphoma',
        'Multiple Myeloma',
        'Leukemia'
      ]
    },
    diarrhea: {
      title:
        'Diarrhea, Lower Respiratory Infections, Meningitis, and Other Common Infectious Diseases',
      keywords: [
        'Diarrhea Diseases',
        'Typhoid',
        'Pneumonia',
        'Influenza',
        'Bronchitis',
        'Whooping cough',
        'Tetanus',
        'Meningitis',
        'Measles',
        'Encephalitis'
      ]
    },
    hiv: {
      title: 'HIV/AIDS and Tuberculosis',
      keywords: ['Tuberculosis', 'HIV/AIDS']
    },
    unintentional: {
      title: 'Unintentional Injuries other Than Transport Injuries',
      keywords: ['Heat Death', 'Poisonings', 'Fire Death', 'Falls', 'Drowning']
    },
    respiratory: {
      title: 'Chronic Respiratory Diseases',
      keywords: [
        'Chronic Obstructive Pulmonary Disease',
        'Asthma',
        'Pneumoconiosis',
        'Diffuse Parenchymal Lung Disease',
        'Pulmonary Sarcoidosis'
      ]
    },
    diabetes: {
      title: 'Diabetes, Urogenital, Blood, And Endocrine Diseases',
      keywords: [
        'Diabetes',
        'Male Infertility',
        'Kidney Disease',
        'Glomerulonephritis',
        'Urinary disease'
      ]
    },
    mental: {
      title: 'Mental and Behavioral Disorders',
      keywords: ['Drug Overdose', 'Alcohol Use Disorders']
    },
    other_communicable: {
      title:
        'Other communicable, maternal, neonatal, and nutritional disorders',
      keywords: ['Syphilis', 'STDs', 'Hepatitis']
    },
    maternal: {
      title: 'Maternal Disorders',
      keywords: [
        'Maternal disorders',
        'Abortion',
        'Maternal Hemorrhage',
        'Pregnancy Hypertensive'
      ]
    },
    tropical: {
      title: 'Neglected Tropical Diseases and Malaria',
      keywords: [
        'Tropical',
        'Ebola',
        'Dengue',
        'Chikungunya',
        'Chagas',
        'Malaria'
      ]
    },
    non_communicable: {
      title: 'Other non-communicable Diseases',
      keywords: ['Skin Disease', 'Skin Melanoma', 'Congenital Anomalies']
    },
    neurological: {
      title: 'Neurological disorders',
      keywords: [
        'Multiple Sclerosis',
        'Parkinsons Disease',
        'Migraine',
        'Epilepsy',
        'Alzheimer'
      ]
    },
    musculoskeletal: {
      title: 'Musculoskeletal Disorders',
      keywords: [
        'Rheumatoid Arthritis',
        'Osteoarthritis',
        'Neck Pain',
        'Low Back Pain',
        'Gout'
      ]
    },
    neonatal: {
      title: 'Neonatal disorders',
      keywords: [
        'Sepsis',
        'Preterm Birth Complications',
        'Neonatal Encephalopathy'
      ]
    },
    cardiovascular: {
      title: 'Cardiovascular and circulatory diseases',
      keywords: [
        'Myocarditis',
        'Ischemic Stroke',
        'Hemorrhagic Stroke',
        'Rheumatic Heart',
        'Peripheral Vascular Disease',
        'Peripheral Arterial Disease',
        'Ischemic Heart',
        'Hypertensive Heart Disease',
        'Endocarditis',
        'Cardiomyopathy',
        'Atrial Flutter',
        'Atrial Fibrillation',
        'Aortic Aneurysm'
      ]
    },
    self_harm: {
      title: 'Self-harm and interpersonal violence',
      keywords: ['Self-Harm', 'Interpersonal Violence']
    },
    digestive: {
      title: 'Digestive Diseases (Except Cirrhosis)',
      keywords: [
        'Intestinal Obstruction',
        'Bile Duct Disease',
        'Peptic Ulcer',
        'Paralytic Ileus',
        'Pancreatitis',
        'Gall Bladder'
      ]
    },
    liver_cirrhosis: {
      title: 'Cirrhosis of the liver',
      keywords: ['Liver Cirrhosis']
    },
    nutritional: {
      title: 'Nutritional Deficiencies',
      keywords: ['Protein-Energy Malnutrition', 'Iron-Deficiency Anemia']
    },
    nature: {
      title: 'Forces of nature, war, and legal intervention',
      keywords: [
        'Typhoon Death',
        'Tsunami Death',
        'Tornado Death',
        'Hurricane Death',
        'Earthquake Death'
      ]
    },
    transport: {
      title: 'Transport injuries',
      keywords: ['Transport Injury', 'Road Injury']
    }
  }
}
