export interface BusinessIdea {
  id: string;
  title: string;
  category: string;
  subcategory: string;
  description: string;
  marketPotential: 'High' | 'Very High' | 'Medium' | 'Explosive';
  initialInvestment: {
    min: number;
    max: number;
    currency: string;
    breakdown: { item: string; cost: string; percentage: number }[];
  };
  timeline: {
    setup: string;
    profitability: string;
    scale: string;
  };
  requirements: {
    education: string[];
    skills: string[];
    certifications: string[];
    licenses: string[];
    location: string[];
  };
  governmentApprovals: {
    required: boolean;
    approvals: string[];
    timeline: string;
    cost: string;
  };
  revenueModel: string[];
  targetMarket: string[];
  challenges: string[];
  successTips: string[];
  trending: boolean;
  difficulty: 'Easy' | 'Medium' | 'Hard' | 'Very Hard';
  roi: {
    year1: string;
    year2: string;
    year3: string;
    potential: string;
  };
  funding: {
    sources: string[];
    schemes: string[];
    eligibility: string[];
  };
  technology: string[];
  sustainability: boolean;
  scalability: 'Local' | 'National' | 'Global';
}

export const innovativeBusinessDataset: BusinessIdea[] = [
  // AI & TECHNOLOGY STARTUPS
  {
    id: 'ai_healthcare_diagnostics',
    title: 'AI-Powered Healthcare Diagnostics',
    category: 'Artificial Intelligence',
    subcategory: 'Healthcare Technology',
    description: 'Develop AI solutions for medical image analysis, disease prediction, and diagnostic assistance for hospitals and clinics',
    marketPotential: 'Explosive',
    initialInvestment: {
      min: 2000000,
      max: 10000000,
      currency: 'INR',
      breakdown: [
        { item: 'AI Development Team', cost: '₹40-60L', percentage: 50 },
        { item: 'Computing Infrastructure', cost: '₹20-30L', percentage: 25 },
        { item: 'Medical Data & Compliance', cost: '₹15-25L', percentage: 15 },
        { item: 'Marketing & Operations', cost: '₹10-15L', percentage: 10 }
      ]
    },
    timeline: {
      setup: '12-18 months',
      profitability: '18-24 months',
      scale: '3-5 years'
    },
    requirements: {
      education: ['BTech/MTech in CS/AI', 'Medical Background (Optional)', 'Data Science Certification'],
      skills: ['Machine Learning', 'Deep Learning', 'Medical Image Processing', 'Regulatory Knowledge'],
      certifications: ['AWS/Azure ML Certification', 'Medical Device Certification', 'ISO 13485'],
      licenses: ['Medical Device License', 'Data Protection Compliance', 'HIPAA Compliance'],
      location: ['Tier 1 Cities', 'Medical Hub Areas', 'Tech Parks']
    },
    governmentApprovals: {
      required: true,
      approvals: ['CDSCO Medical Device License', 'Data Localization Compliance', 'Clinical Trial Approval'],
      timeline: '6-12 months',
      cost: '₹5-15 Lakhs'
    },
    revenueModel: ['SaaS Licensing', 'Per-scan Revenue', 'Hospital Partnerships', 'Telemedicine Integration'],
    targetMarket: ['Private Hospitals', 'Diagnostic Centers', 'Telemedicine Platforms', 'Government Healthcare'],
    challenges: ['Regulatory Approval', 'Medical Data Privacy', 'Doctor Adoption', 'High R&D Costs'],
    successTips: ['Partner with Medical Institutions', 'Focus on Accuracy & Compliance', 'Build Strong Clinical Evidence'],
    trending: true,
    difficulty: 'Very Hard',
    roi: {
      year1: '-20% to 0%',
      year2: '15-30%',
      year3: '40-80%',
      potential: '100-300%'
    },
    funding: {
      sources: ['VC Funding', 'Angel Investors', 'Government Grants', 'Medical Device Accelerators'],
      schemes: ['Startup India', 'BIRAC Funding', 'NASSCOM 10K Startups', 'MeitY Startup Hub'],
      eligibility: ['Tech Background', 'Prototype Ready', 'Medical Validation', 'Team Experience']
    },
    technology: ['TensorFlow', 'PyTorch', 'OpenCV', 'DICOM', 'Cloud Computing', 'Edge Computing'],
    sustainability: true,
    scalability: 'Global'
  },

  {
    id: 'blockchain_supply_chain',
    title: 'Blockchain Supply Chain Management',
    category: 'Blockchain Technology',
    subcategory: 'Enterprise Solutions',
    description: 'Blockchain-based platform for transparent, traceable supply chain management across industries',
    marketPotential: 'Very High',
    initialInvestment: {
      min: 1500000,
      max: 5000000,
      currency: 'INR',
      breakdown: [
        { item: 'Blockchain Development', cost: '₹30-40L', percentage: 40 },
        { item: 'Enterprise Integration', cost: '₹20-30L', percentage: 30 },
        { item: 'Security & Compliance', cost: '₹15-20L', percentage: 20 },
        { item: 'Sales & Marketing', cost: '₹10-15L', percentage: 10 }
      ]
    },
    timeline: {
      setup: '8-12 months',
      profitability: '12-18 months',
      scale: '2-4 years'
    },
    requirements: {
      education: ['BTech in CS/IT', 'Blockchain Certification', 'Supply Chain Management'],
      skills: ['Solidity Programming', 'Smart Contracts', 'Enterprise Architecture', 'Business Development'],
      certifications: ['Hyperledger Certification', 'Ethereum Developer', 'Supply Chain Professional'],
      licenses: ['Software Export License', 'Data Protection Compliance', 'Industry-specific Certifications'],
      location: ['Metro Cities', 'Industrial Areas', 'Tech Hubs']
    },
    governmentApprovals: {
      required: false,
      approvals: ['Software Export Promotion', 'Industry Partnership Registration'],
      timeline: '2-3 months',
      cost: '₹1-3 Lakhs'
    },
    revenueModel: ['Enterprise Licensing', 'Transaction Fees', 'Implementation Services', 'Maintenance Contracts'],
    targetMarket: ['Manufacturing Companies', 'Retail Chains', 'Pharmaceutical Industry', 'Food & Agriculture'],
    challenges: ['Enterprise Adoption', 'Integration Complexity', 'Regulatory Uncertainty', 'Technical Expertise'],
    successTips: ['Start with Pilot Projects', 'Focus on ROI Demonstration', 'Build Industry Partnerships'],
    trending: true,
    difficulty: 'Hard',
    roi: {
      year1: '0-15%',
      year2: '25-40%',
      year3: '50-80%',
      potential: '80-200%'
    },
    funding: {
      sources: ['Enterprise VC', 'Strategic Investors', 'Government Innovation Funds'],
      schemes: ['NASSCOM DeepTech Club', 'MeitY Startup Hub', 'Industry 4.0 Initiatives'],
      eligibility: ['Technical Prototype', 'Enterprise Partnerships', 'Blockchain Expertise']
    },
    technology: ['Hyperledger Fabric', 'Ethereum', 'Smart Contracts', 'IoT Integration', 'API Development'],
    sustainability: true,
    scalability: 'Global'
  },

  // RENEWABLE ENERGY VENTURES
  {
    id: 'solar_microgrid_solutions',
    title: 'Solar Microgrid Solutions for Rural Areas',
    category: 'Renewable Energy',
    subcategory: 'Solar Technology',
    description: 'Design and implement solar-powered microgrids for rural communities and remote areas',
    marketPotential: 'Very High',
    initialInvestment: {
      min: 5000000,
      max: 20000000,
      currency: 'INR',
      breakdown: [
        { item: 'Solar Equipment & Installation', cost: '₹60-80L', percentage: 60 },
        { item: 'Grid Infrastructure', cost: '₹20-30L', percentage: 20 },
        { item: 'Operations & Maintenance', cost: '₹10-15L', percentage: 10 },
        { item: 'Working Capital', cost: '₹10-15L', percentage: 10 }
      ]
    },
    timeline: {
      setup: '6-12 months',
      profitability: '2-3 years',
      scale: '3-7 years'
    },
    requirements: {
      education: ['Electrical Engineering', 'Renewable Energy Certification', 'Project Management'],
      skills: ['Solar System Design', 'Grid Integration', 'Rural Development', 'Financial Modeling'],
      certifications: ['Solar PV Installer', 'Grid Integration Specialist', 'Project Management'],
      licenses: ['Electrical Contractor License', 'Renewable Energy Certificate', 'Environment Clearance'],
      location: ['Rural Areas', 'Remote Locations', 'Tribal Areas', 'Industrial Zones']
    },
    governmentApprovals: {
      required: true,
      approvals: ['State Electricity Board', 'Environmental Clearance', 'Land Use Permission'],
      timeline: '4-8 months',
      cost: '₹5-10 Lakhs'
    },
    revenueModel: ['Power Sale to Grid', 'Direct Consumer Billing', 'O&M Contracts', 'Energy Storage Services'],
    targetMarket: ['Rural Communities', 'Agricultural Users', 'Small Industries', 'Government Projects'],
    challenges: ['Grid Integration', 'Financing', 'Technical Maintenance', 'Policy Changes'],
    successTips: ['Partner with Local Governments', 'Focus on Community Engagement', 'Ensure Reliable Maintenance'],
    trending: true,
    difficulty: 'Hard',
    roi: {
      year1: '-30% to -10%',
      year2: '5-15%',
      year3: '20-35%',
      potential: '25-45%'
    },
    funding: {
      sources: ['Green Bonds', 'Development Finance', 'Impact Investors', 'Government Subsidies'],
      schemes: ['PM-KUSUM', 'Solar Park Scheme', 'IREDA Funding', 'World Bank Projects'],
      eligibility: ['Technical Expertise', 'Project Viability', 'Community Support', 'Environmental Compliance']
    },
    technology: ['Solar PV Panels', 'Battery Storage', 'Smart Grid Technology', 'IoT Monitoring', 'Mobile Payment'],
    sustainability: true,
    scalability: 'National'
  },

  {
    id: 'waste_to_energy',
    title: 'Waste-to-Energy Solutions',
    category: 'Renewable Energy',
    subcategory: 'Waste Management',
    description: 'Convert organic waste into biogas and electricity using advanced anaerobic digestion technology',
    marketPotential: 'High',
    initialInvestment: {
      min: 8000000,
      max: 25000000,
      currency: 'INR',
      breakdown: [
        { item: 'Biogas Plant Equipment', cost: '₹80-120L', percentage: 50 },
        { item: 'Land & Infrastructure', cost: '₹40-60L', percentage: 25 },
        { item: 'Installation & Commissioning', cost: '₹20-30L', percentage: 15 },
        { item: 'Working Capital', cost: '₹20-30L', percentage: 10 }
      ]
    },
    timeline: {
      setup: '12-18 months',
      profitability: '3-4 years',
      scale: '5-8 years'
    },
    requirements: {
      education: ['Chemical/Environmental Engineering', 'Waste Management Certification'],
      skills: ['Biogas Technology', 'Waste Processing', 'Environmental Compliance', 'Operations Management'],
      certifications: ['Environmental Impact Assessment', 'Waste Management License', 'Pollution Control'],
      licenses: ['Pollution Control Board', 'Waste Processing License', 'Electricity Generation License'],
      location: ['Industrial Areas', 'Municipal Waste Sites', 'Agricultural Zones']
    },
    governmentApprovals: {
      required: true,
      approvals: ['Environmental Clearance', 'Pollution Control Board', 'Municipal Permissions'],
      timeline: '6-12 months',
      cost: '₹8-15 Lakhs'
    },
    revenueModel: ['Electricity Sale', 'Biogas Sale', 'Waste Processing Fees', 'Organic Fertilizer Sale'],
    targetMarket: ['Municipal Corporations', 'Industrial Waste Generators', 'Agricultural Communities'],
    challenges: ['Waste Supply Consistency', 'Technology Maintenance', 'Regulatory Compliance'],
    successTips: ['Secure Long-term Waste Contracts', 'Focus on Operational Efficiency', 'Diversify Revenue Streams'],
    trending: true,
    difficulty: 'Very Hard',
    roi: {
      year1: '-40% to -20%',
      year2: '-10% to 5%',
      year3: '15-25%',
      potential: '20-40%'
    },
    funding: {
      sources: ['Green Financing', 'Government Grants', 'Development Banks', 'Carbon Credits'],
      schemes: ['Swachh Bharat Mission', 'NABARD Funding', 'Clean Development Mechanism'],
      eligibility: ['Environmental Clearance', 'Technical Expertise', 'Waste Supply Agreements']
    },
    technology: ['Anaerobic Digestion', 'Gas Purification', 'Power Generation', 'Waste Pre-processing'],
    sustainability: true,
    scalability: 'National'
  },

  // BIOTECHNOLOGY & HEALTH
  {
    id: 'personalized_nutrition',
    title: 'Personalized Nutrition Based on Genomics',
    category: 'Biotechnology',
    subcategory: 'Precision Medicine',
    description: 'AI-driven personalized nutrition recommendations based on genetic testing and health data',
    marketPotential: 'Very High',
    initialInvestment: {
      min: 3000000,
      max: 12000000,
      currency: 'INR',
      breakdown: [
        { item: 'Lab Setup & Equipment', cost: '₹40-60L', percentage: 40 },
        { item: 'AI Development & Software', cost: '₹30-40L', percentage: 30 },
        { item: 'Regulatory & Compliance', cost: '₹15-25L', percentage: 15 },
        { item: 'Marketing & Operations', cost: '₹15-25L', percentage: 15 }
      ]
    },
    timeline: {
      setup: '12-18 months',
      profitability: '18-30 months',
      scale: '3-5 years'
    },
    requirements: {
      education: ['Biotechnology/Genetics', 'Nutrition Science', 'Data Science', 'Medical Technology'],
      skills: ['Genomic Analysis', 'Nutrition Science', 'AI/ML', 'Clinical Research', 'Regulatory Affairs'],
      certifications: ['Clinical Lab Certification', 'Genetic Counseling', 'Nutrition Specialist', 'Data Privacy'],
      licenses: ['Clinical Laboratory License', 'Genetic Testing Approval', 'Medical Device Registration'],
      location: ['Metro Cities', 'Medical Hubs', 'Biotech Parks']
    },
    governmentApprovals: {
      required: true,
      approvals: ['CDSCO Medical Device License', 'Clinical Lab License', 'Genetic Testing Approval'],
      timeline: '8-12 months',
      cost: '₹10-20 Lakhs'
    },
    revenueModel: ['Direct-to-Consumer Testing', 'Healthcare Provider Partnerships', 'Subscription Plans', 'Corporate Wellness'],
    targetMarket: ['Health-conscious Consumers', 'Healthcare Providers', 'Corporate Wellness', 'Fitness Centers'],
    challenges: ['Regulatory Approval', 'Consumer Education', 'Data Privacy', 'Scientific Validation'],
    successTips: ['Build Strong Scientific Evidence', 'Partner with Healthcare Providers', 'Focus on User Experience'],
    trending: true,
    difficulty: 'Very Hard',
    roi: {
      year1: '-20% to 0%',
      year2: '20-35%',
      year3: '40-70%',
      potential: '60-150%'
    },
    funding: {
      sources: ['Healthcare VC', 'Angel Investors', 'Government Biotech Grants', 'Strategic Partnerships'],
      schemes: ['BIRAC Funding', 'Biotechnology Ignition Grant', 'NIDHI Program', 'Startup India'],
      eligibility: ['Scientific Expertise', 'Clinical Validation', 'Regulatory Pathway', 'Market Research']
    },
    technology: ['Genomic Sequencing', 'AI/ML Algorithms', 'Mobile Apps', 'Cloud Computing', 'Data Analytics'],
    sustainability: true,
    scalability: 'Global'
  },

  {
    id: 'lab_grown_meat',
    title: 'Lab-Grown Meat Production',
    category: 'Biotechnology',
    subcategory: 'Food Technology',
    description: 'Cultured meat production using cellular agriculture for sustainable protein alternatives',
    marketPotential: 'Explosive',
    initialInvestment: {
      min: 10000000,
      max: 50000000,
      currency: 'INR',
      breakdown: [
        { item: 'Lab Equipment & Bioreactors', cost: '₹150-250L', percentage: 50 },
        { item: 'R&D and Cell Lines', cost: '₹80-120L', percentage: 25 },
        { item: 'Facility & Infrastructure', cost: '₹60-100L', percentage: 15 },
        { item: 'Regulatory & Marketing', cost: '₹40-80L', percentage: 10 }
      ]
    },
    timeline: {
      setup: '24-36 months',
      profitability: '5-7 years',
      scale: '7-10 years'
    },
    requirements: {
      education: ['Biotechnology', 'Food Science', 'Cell Biology', 'Bioprocess Engineering'],
      skills: ['Cell Culture', 'Bioprocess Design', 'Food Safety', 'Scale-up Manufacturing', 'Regulatory Affairs'],
      certifications: ['Food Safety Management', 'Biotechnology Certification', 'Quality Management'],
      licenses: ['Food Manufacturing License', 'Novel Food Approval', 'Biotechnology Clearance'],
      location: ['Biotech Parks', 'Food Processing Zones', 'Research Institutes']
    },
    governmentApprovals: {
      required: true,
      approvals: ['FSSAI Novel Food Approval', 'Biotechnology Regulatory Authority', 'Environmental Clearance'],
      timeline: '18-24 months',
      cost: '₹25-50 Lakhs'
    },
    revenueModel: ['Direct Food Sales', 'B2B Food Ingredients', 'Licensing Technology', 'Contract Manufacturing'],
    targetMarket: ['Premium Food Markets', 'Restaurant Chains', 'Export Markets', 'Health-conscious Consumers'],
    challenges: ['Regulatory Approval', 'Production Costs', 'Consumer Acceptance', 'Scale-up Challenges'],
    successTips: ['Focus on Cost Reduction', 'Build Consumer Awareness', 'Partner with Food Companies'],
    trending: true,
    difficulty: 'Very Hard',
    roi: {
      year1: '-80% to -60%',
      year2: '-50% to -30%',
      year3: '-20% to 0%',
      potential: '100-500%'
    },
    funding: {
      sources: ['Deep Tech VC', 'Impact Investors', 'Government Grants', 'Strategic Food Partners'],
      schemes: ['Deep Tech Startup Fund', 'BIRAC Funding', 'Food Processing Venture Capital'],
      eligibility: ['Advanced R&D', 'IP Portfolio', 'Technical Team', 'Scalability Plan']
    },
    technology: ['Cell Culture Technology', 'Bioreactors', 'Growth Media', '3D Bioprinting', 'Food Processing'],
    sustainability: true,
    scalability: 'Global'
  },

  // SPACE TECHNOLOGY
  {
    id: 'satellite_data_analytics',
    title: 'Satellite Data Analytics for Agriculture',
    category: 'Space Technology',
    subcategory: 'Earth Observation',
    description: 'AI-powered analysis of satellite imagery for precision agriculture and crop monitoring',
    marketPotential: 'Very High',
    initialInvestment: {
      min: 2000000,
      max: 8000000,
      currency: 'INR',
      breakdown: [
        { item: 'Satellite Data Licensing', cost: '₹25-40L', percentage: 35 },
        { item: 'AI Development Team', cost: '₹20-35L', percentage: 30 },
        { item: 'Computing Infrastructure', cost: '₹15-25L', percentage: 20 },
        { item: 'Field Operations & Marketing', cost: '₹10-20L', percentage: 15 }
      ]
    },
    timeline: {
      setup: '8-12 months',
      profitability: '12-18 months',
      scale: '2-4 years'
    },
    requirements: {
      education: ['Aerospace Engineering', 'Remote Sensing', 'Data Science', 'Agricultural Engineering'],
      skills: ['Satellite Image Processing', 'Machine Learning', 'GIS', 'Agricultural Knowledge', 'Data Analytics'],
      certifications: ['Remote Sensing Certification', 'GIS Professional', 'Agricultural Technology'],
      licenses: ['Satellite Data License', 'Agricultural Advisory License', 'Technology Export License'],
      location: ['Metro Cities', 'Agricultural Hubs', 'Tech Parks', 'Rural Service Centers']
    },
    governmentApprovals: {
      required: false,
      approvals: ['Satellite Data Usage Agreement', 'Agricultural Extension Registration'],
      timeline: '2-4 months',
      cost: '₹2-5 Lakhs'
    },
    revenueModel: ['Subscription Services', 'Per-acre Analysis', 'Insurance Partnerships', 'Government Contracts'],
    targetMarket: ['Large Farmers', 'Agricultural Cooperatives', 'Insurance Companies', 'Government Agencies'],
    challenges: ['Data Access Costs', 'Farmer Adoption', 'Technical Complexity', 'Internet Connectivity'],
    successTips: ['Demonstrate Clear ROI', 'Build Local Partnerships', 'Simplify User Interface'],
    trending: true,
    difficulty: 'Hard',
    roi: {
      year1: '10-25%',
      year2: '30-50%',
      year3: '50-80%',
      potential: '70-150%'
    },
    funding: {
      sources: ['AgTech VC', 'Space Technology Funds', 'Government Grants', 'Agricultural Banks'],
      schemes: ['IN-SPACe Funding', 'AgTech Innovation Fund', 'ISRO Technology Transfer'],
      eligibility: ['Technical Expertise', 'Agricultural Domain Knowledge', 'Pilot Projects']
    },
    technology: ['Satellite Imagery', 'Machine Learning', 'Cloud Computing', 'Mobile Apps', 'IoT Sensors'],
    sustainability: true,
    scalability: 'Global'
  },

  {
    id: 'nanosatellite_constellation',
    title: 'NanoSatellite Constellation for IoT',
    category: 'Space Technology',
    subcategory: 'Satellite Manufacturing',
    description: 'Deploy constellation of nanosatellites for IoT connectivity in remote areas',
    marketPotential: 'High',
    initialInvestment: {
      min: 50000000,
      max: 200000000,
      currency: 'INR',
      breakdown: [
        { item: 'Satellite Manufacturing', cost: '₹300-600L', percentage: 45 },
        { item: 'Launch Services', cost: '₹200-400L', percentage: 30 },
        { item: 'Ground Infrastructure', cost: '₹100-200L', percentage: 15 },
        { item: 'Operations & Technology', cost: '₹100-200L', percentage: 10 }
      ]
    },
    timeline: {
      setup: '36-48 months',
      profitability: '5-7 years',
      scale: '8-12 years'
    },
    requirements: {
      education: ['Aerospace Engineering', 'Electronics Engineering', 'Space Technology'],
      skills: ['Satellite Design', 'RF Engineering', 'Space Systems', 'Project Management', 'Regulatory Affairs'],
      certifications: ['Space Technology Certification', 'RF Engineering', 'Project Management'],
      licenses: ['Space Activities Authorization', 'Satellite Communication License', 'Export Control'],
      location: ['Space Technology Parks', 'Research Institutes', 'Manufacturing Hubs']
    },
    governmentApprovals: {
      required: true,
      approvals: ['IN-SPACe Authorization', 'DoS/DoT Approvals', 'Export Control Clearance'],
      timeline: '12-18 months',
      cost: '₹50-100 Lakhs'
    },
    revenueModel: ['IoT Connectivity Services', 'Data Services', 'Satellite Leasing', 'Ground Services'],
    targetMarket: ['IoT Companies', 'Maritime Industry', 'Agriculture Sector', 'Defense Applications'],
    challenges: ['High Capital Requirements', 'Regulatory Complexity', 'Technical Risks', 'Market Competition'],
    successTips: ['Start with Pilot Constellation', 'Focus on Specific Use Cases', 'Build Strategic Partnerships'],
    trending: true,
    difficulty: 'Very Hard',
    roi: {
      year1: '-80% to -60%',
      year2: '-40% to -20%',
      year3: '-10% to 10%',
      potential: '50-200%'
    },
    funding: {
      sources: ['Deep Tech VC', 'Government Space Funds', 'Strategic Investors', 'International Partners'],
      schemes: ['IN-SPACe Funding', 'Deep Tech Mission', 'ISRO Technology Incubation'],
      eligibility: ['Space Technology Expertise', 'Manufacturing Capability', 'Regulatory Approval']
    },
    technology: ['CubeSat Technology', 'RF Communication', 'Solar Panels', 'Attitude Control', 'Ground Stations'],
    sustainability: true,
    scalability: 'Global'
  },

  // CYBERSECURITY
  {
    id: 'ai_cybersecurity_soc',
    title: 'AI-Powered Security Operations Center',
    category: 'Cybersecurity',
    subcategory: 'Enterprise Security',
    description: 'AI-driven SOC-as-a-Service for real-time threat detection and incident response',
    marketPotential: 'Very High',
    initialInvestment: {
      min: 5000000,
      max: 15000000,
      currency: 'INR',
      breakdown: [
        { item: 'AI/ML Infrastructure', cost: '₹40-60L', percentage: 35 },
        { item: 'Security Tools & Licenses', cost: '₹30-50L', percentage: 30 },
        { item: 'Expert Team & Training', cost: '₹25-40L', percentage: 25 },
        { item: 'Operations & Compliance', cost: '₹15-25L', percentage: 10 }
      ]
    },
    timeline: {
      setup: '6-12 months',
      profitability: '12-18 months',
      scale: '2-4 years'
    },
    requirements: {
      education: ['Cybersecurity', 'Computer Science', 'Information Security'],
      skills: ['SOC Operations', 'AI/ML', 'Threat Intelligence', 'Incident Response', 'Compliance'],
      certifications: ['CISSP', 'CISM', 'CEH', 'GCIH', 'AWS/Azure Security'],
      licenses: ['ISO 27001 Certification', 'SOC 2 Compliance', 'Data Protection Registration'],
      location: ['Cybersecurity Hubs', 'Tech Parks', 'Metro Cities']
    },
    governmentApprovals: {
      required: true,
      approvals: ['CERT-In Registration', 'Data Localization Compliance', 'Cybersecurity Framework'],
      timeline: '3-6 months',
      cost: '₹5-10 Lakhs'
    },
    revenueModel: ['SOC-as-a-Service', 'Incident Response', 'Threat Intelligence', 'Compliance Services'],
    targetMarket: ['Mid-size Enterprises', 'Financial Services', 'Healthcare', 'Government Agencies'],
    challenges: ['Talent Shortage', 'Technology Integration', 'Client Trust', 'Regulatory Compliance'],
    successTips: ['Focus on AI Automation', 'Build Expert Team', 'Demonstrate ROI'],
    trending: true,
    difficulty: 'Hard',
    roi: {
      year1: '15-30%',
      year2: '40-60%',
      year3: '60-100%',
      potential: '80-200%'
    },
    funding: {
      sources: ['Cybersecurity VC', 'Enterprise Investors', 'Government Security Funds'],
      schemes: ['Cybersecurity Startup Fund', 'NASSCOM Cybersecurity Initiative', 'MeitY Innovation'],
      eligibility: ['Cybersecurity Expertise', 'Technical Team', 'Client References']
    },
    technology: ['AI/ML Platforms', 'SIEM Tools', 'Threat Intelligence', 'Automation Tools', 'Cloud Security'],
    sustainability: true,
    scalability: 'Global'
  },

  // SUSTAINABLE FARMING
  {
    id: 'vertical_farming_systems',
    title: 'Automated Vertical Farming Systems',
    category: 'Sustainable Agriculture',
    subcategory: 'Urban Farming',
    description: 'IoT-enabled vertical farming solutions for urban areas with automated climate control',
    marketPotential: 'High',
    initialInvestment: {
      min: 3000000,
      max: 12000000,
      currency: 'INR',
      breakdown: [
        { item: 'Farming Equipment & Setup', cost: '₹40-70L', percentage: 50 },
        { item: 'IoT & Automation Systems', cost: '₹20-30L', percentage: 20 },
        { item: 'Facility & Infrastructure', cost: '₹20-30L', percentage: 20 },
        { item: 'Working Capital & Marketing', cost: '₹10-20L', percentage: 10 }
      ]
    },
    timeline: {
      setup: '6-12 months',
      profitability: '18-24 months',
      scale: '3-5 years'
    },
    requirements: {
      education: ['Agricultural Engineering', 'Horticulture', 'IoT Technology', 'Business Management'],
      skills: ['Controlled Environment Agriculture', 'IoT Systems', 'Crop Management', 'Business Operations'],
      certifications: ['Organic Farming', 'Food Safety', 'IoT Certification', 'Sustainable Agriculture'],
      licenses: ['Agricultural License', 'Food Processing', 'Organic Certification', 'Urban Farming Permit'],
      location: ['Urban Areas', 'Industrial Zones', 'Rooftops', 'Warehouse Spaces']
    },
    governmentApprovals: {
      required: false,
      approvals: ['Municipal Building Permits', 'Organic Certification', 'Food Safety License'],
      timeline: '2-4 months',
      cost: '₹3-8 Lakhs'
    },
    revenueModel: ['Direct Sales to Consumers', 'Restaurant Supply', 'Retail Partnerships', 'Farming-as-a-Service'],
    targetMarket: ['Urban Consumers', 'Premium Restaurants', 'Organic Food Stores', 'Corporate Cafeterias'],
    challenges: ['High Setup Costs', 'Energy Consumption', 'Technical Expertise', 'Market Education'],
    successTips: ['Focus on High-Value Crops', 'Optimize Energy Efficiency', 'Build Local Supply Chains'],
    trending: true,
    difficulty: 'Medium',
    roi: {
      year1: '-10% to 10%',
      year2: '20-35%',
      year3: '35-60%',
      potential: '40-80%'
    },
    funding: {
      sources: ['AgTech Investors', 'Sustainable Agriculture Funds', 'Government Grants'],
      schemes: ['Rashtriya Krishi Vikas Yojana', 'AgTech Innovation Fund', 'Sustainable Agriculture Mission'],
      eligibility: ['Agricultural Background', 'Technical Capability', 'Market Research', 'Sustainability Focus']
    },
    technology: ['LED Grow Lights', 'Hydroponic Systems', 'IoT Sensors', 'Climate Control', 'Mobile Apps'],
    sustainability: true,
    scalability: 'National'
  },

  // E-COMMERCE NICHES
  {
    id: 'social_commerce_platform',
    title: 'Social Commerce Platform for Creators',
    category: 'E-commerce',
    subcategory: 'Creator Economy',
    description: 'Social media integrated e-commerce platform enabling creators to monetize their content',
    marketPotential: 'Explosive',
    initialInvestment: {
      min: 2000000,
      max: 10000000,
      currency: 'INR',
      breakdown: [
        { item: 'Platform Development', cost: '₹30-50L', percentage: 40 },
        { item: 'Creator Acquisition', cost: '₹20-30L', percentage: 25 },
        { item: 'Technology Infrastructure', cost: '₹15-25L', percentage: 20 },
        { item: 'Marketing & Operations', cost: '₹15-25L', percentage: 15 }
      ]
    },
    timeline: {
      setup: '8-12 months',
      profitability: '12-24 months',
      scale: '2-4 years'
    },
    requirements: {
      education: ['Computer Science', 'E-commerce', 'Digital Marketing', 'Business Administration'],
      skills: ['Full-stack Development', 'Social Media Integration', 'Payment Systems', 'Creator Relations'],
      certifications: ['AWS/Azure Certification', 'Payment Gateway Integration', 'Social Media Marketing'],
      licenses: ['E-commerce License', 'Payment Aggregator License', 'Data Protection Compliance'],
      location: ['Metro Cities', 'Tech Hubs', 'Creator Communities']
    },
    governmentApprovals: {
      required: true,
      approvals: ['E-commerce Registration', 'Payment Gateway License', 'Data Localization'],
      timeline: '3-6 months',
      cost: '₹5-15 Lakhs'
    },
    revenueModel: ['Commission on Sales', 'Creator Subscription', 'Advertising Revenue', 'Premium Features'],
    targetMarket: ['Content Creators', 'Influencers', 'Small Brands', 'Social Media Users'],
    challenges: ['Creator Acquisition', 'Platform Stickiness', 'Competition', 'Content Moderation'],
    successTips: ['Focus on Creator Success', 'Build Strong Community', 'Optimize User Experience'],
    trending: true,
    difficulty: 'Medium',
    roi: {
      year1: '0-20%',
      year2: '25-50%',
      year3: '50-100%',
      potential: '100-300%'
    },
    funding: {
      sources: ['E-commerce VC', 'Creator Economy Funds', 'Angel Investors'],
      schemes: ['Startup India', 'Digital India Initiative', 'E-commerce Development Fund'],
      eligibility: ['Platform Prototype', 'Creator Base', 'Technology Team', 'Market Validation']
    },
    technology: ['React/React Native', 'Cloud Infrastructure', 'Payment APIs', 'Social Media APIs', 'Analytics'],
    sustainability: true,
    scalability: 'Global'
  },

  // DIGITAL CONTENT CREATION
  {
    id: 'ai_content_studio',
    title: 'AI-Powered Content Creation Studio',
    category: 'Digital Content',
    subcategory: 'Media Production',
    description: 'AI tools for automated video editing, content generation, and creative production',
    marketPotential: 'Very High',
    initialInvestment: {
      min: 1500000,
      max: 6000000,
      currency: 'INR',
      breakdown: [
        { item: 'AI Development & Licensing', cost: '₹25-35L', percentage: 45 },
        { item: 'Creative Team & Studio', cost: '₹15-25L', percentage: 25 },
        { item: 'Technology Infrastructure', cost: '₹10-15L', percentage: 20 },
        { item: 'Marketing & Operations', cost: '₹8-15L', percentage: 10 }
      ]
    },
    timeline: {
      setup: '6-9 months',
      profitability: '9-15 months',
      scale: '2-3 years'
    },
    requirements: {
      education: ['Computer Science', 'Media Technology', 'AI/ML', 'Creative Arts'],
      skills: ['AI/ML Development', 'Video Editing', 'Creative Direction', 'Client Management'],
      certifications: ['AI/ML Certification', 'Adobe Certified Expert', 'Creative Software Proficiency'],
      licenses: ['Software License', 'Content Creation License', 'IP Protection'],
      location: ['Metro Cities', 'Media Hubs', 'Creative Districts', 'Tech Parks']
    },
    governmentApprovals: {
      required: false,
      approvals: ['Software Export Registration', 'Intellectual Property Registration'],
      timeline: '1-2 months',
      cost: '₹2-5 Lakhs'
    },
    revenueModel: ['SaaS Subscriptions', 'Custom Content Projects', 'AI Tool Licensing', 'Training Services'],
    targetMarket: ['Content Creators', 'Marketing Agencies', 'Media Companies', 'Small Businesses'],
    challenges: ['AI Technology Costs', 'Creative Quality', 'Market Education', 'Competition'],
    successTips: ['Focus on User Experience', 'Build Creator Community', 'Continuous AI Improvement'],
    trending: true,
    difficulty: 'Medium',
    roi: {
      year1: '20-35%',
      year2: '40-70%',
      year3: '60-120%',
      potential: '80-200%'
    },
    funding: {
      sources: ['AI/ML Investors', 'Media Tech Funds', 'Creator Economy VCs'],
      schemes: ['AI Mission', 'Digital India Content Fund', 'Creative Industry Support'],
      eligibility: ['AI Technology', 'Creative Portfolio', 'Market Validation', 'Technical Team']
    },
    technology: ['Computer Vision', 'Natural Language Processing', 'Cloud GPUs', 'Video Processing APIs'],
    sustainability: false,
    scalability: 'Global'
  }
];

export const getBusinessesByCategory = (category: string): BusinessIdea[] => {
  return innovativeBusinessDataset.filter(business => business.category === category);
};

export const getTrendingBusinesses = (): BusinessIdea[] => {
  return innovativeBusinessDataset.filter(business => business.trending);
};

export const getBusinessesByInvestment = (maxInvestment: number): BusinessIdea[] => {
  return innovativeBusinessDataset.filter(business => business.initialInvestment.min <= maxInvestment);
};

export const getBusinessesByDifficulty = (difficulty: string): BusinessIdea[] => {
  return innovativeBusinessDataset.filter(business => business.difficulty === difficulty);
};

export const getSustainableBusinesses = (): BusinessIdea[] => {
  return innovativeBusinessDataset.filter(business => business.sustainability);
};

export const searchBusinesses = (query: string): BusinessIdea[] => {
  const lowerQuery = query.toLowerCase();
  return innovativeBusinessDataset.filter(business => 
    business.title.toLowerCase().includes(lowerQuery) ||
    business.description.toLowerCase().includes(lowerQuery) ||
    business.category.toLowerCase().includes(lowerQuery) ||
    business.subcategory.toLowerCase().includes(lowerQuery) ||
    business.targetMarket.some(market => market.toLowerCase().includes(lowerQuery)) ||
    business.technology.some(tech => tech.toLowerCase().includes(lowerQuery))
  );
};

export const getUniqueCategories = (): string[] => {
  return Array.from(new Set(innovativeBusinessDataset.map(business => business.category)));
};

export const getBusinessesByROI = (minROI: number): BusinessIdea[] => {
  return innovativeBusinessDataset.filter(business => {
    const potentialROI = parseInt(business.roi.potential.split('-')[1]?.replace('%', '') || '0');
    return potentialROI >= minROI;
  });
};
