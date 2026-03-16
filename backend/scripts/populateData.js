const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Database file path
const dbPath = path.join(__dirname, '..', 'database.sqlite');

// Create database connection
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error opening database:', err.message);
    } else {
        console.log('Connected to SQLite database.');
    }
});

// Extended college data (Top 75 colleges)
const colleges = [
    // IITs (Top 23)
    { name: 'Indian Institute of Technology Madras', location: 'Chennai, Tamil Nadu', state: 'Tamil Nadu', city: 'Chennai', nirf_rank: 1, type: 'IIT', established_year: 1959, website: 'https://www.iitm.ac.in' },
    { name: 'Indian Institute of Technology Delhi', location: 'New Delhi, Delhi', state: 'Delhi', city: 'New Delhi', nirf_rank: 2, type: 'IIT', established_year: 1961, website: 'https://www.iitd.ac.in' },
    { name: 'Indian Institute of Technology Bombay', location: 'Mumbai, Maharashtra', state: 'Maharashtra', city: 'Mumbai', nirf_rank: 3, type: 'IIT', established_year: 1958, website: 'https://www.iitb.ac.in' },
    { name: 'Indian Institute of Technology Kanpur', location: 'Kanpur, Uttar Pradesh', state: 'Uttar Pradesh', city: 'Kanpur', nirf_rank: 4, type: 'IIT', established_year: 1959, website: 'https://www.iitk.ac.in' },
    { name: 'Indian Institute of Technology Roorkee', location: 'Roorkee, Uttarakhand', state: 'Uttarakhand', city: 'Roorkee', nirf_rank: 5, type: 'IIT', established_year: 1847, website: 'https://www.iitr.ac.in' },
    { name: 'Indian Institute of Technology Kharagpur', location: 'Kharagpur, West Bengal', state: 'West Bengal', city: 'Kharagpur', nirf_rank: 6, type: 'IIT', established_year: 1951, website: 'https://www.iitkgp.ac.in' },
    { name: 'Indian Institute of Technology Guwahati', location: 'Guwahati, Assam', state: 'Assam', city: 'Guwahati', nirf_rank: 7, type: 'IIT', established_year: 1994, website: 'https://www.iitg.ac.in' },
    { name: 'Indian Institute of Technology Hyderabad', location: 'Hyderabad, Telangana', state: 'Telangana', city: 'Hyderabad', nirf_rank: 8, type: 'IIT', established_year: 2008, website: 'https://www.iith.ac.in' },
    { name: 'Indian Institute of Technology Indore', location: 'Indore, Madhya Pradesh', state: 'Madhya Pradesh', city: 'Indore', nirf_rank: 9, type: 'IIT', established_year: 2009, website: 'https://www.iiti.ac.in' },
    { name: 'Indian Institute of Technology Gandhinagar', location: 'Gandhinagar, Gujarat', state: 'Gujarat', city: 'Gandhinagar', nirf_rank: 10, type: 'IIT', established_year: 2008, website: 'https://www.iitgn.ac.in' },
    { name: 'Indian Institute of Technology Ropar', location: 'Ropar, Punjab', state: 'Punjab', city: 'Ropar', nirf_rank: 11, type: 'IIT', established_year: 2008, website: 'https://www.iitrpr.ac.in' },
    { name: 'Indian Institute of Technology Patna', location: 'Patna, Bihar', state: 'Bihar', city: 'Patna', nirf_rank: 12, type: 'IIT', established_year: 2008, website: 'https://www.iitp.ac.in' },
    { name: 'Indian Institute of Technology Bhubaneswar', location: 'Bhubaneswar, Odisha', state: 'Odisha', city: 'Bhubaneswar', nirf_rank: 13, type: 'IIT', established_year: 2008, website: 'https://www.iitbbs.ac.in' },
    { name: 'Indian Institute of Technology Jodhpur', location: 'Jodhpur, Rajasthan', state: 'Rajasthan', city: 'Jodhpur', nirf_rank: 14, type: 'IIT', established_year: 2008, website: 'https://www.iitj.ac.in' },
    { name: 'Indian Institute of Technology Mandi', location: 'Mandi, Himachal Pradesh', state: 'Himachal Pradesh', city: 'Mandi', nirf_rank: 15, type: 'IIT', established_year: 2009, website: 'https://www.iitmandi.ac.in' },
    { name: 'Indian Institute of Technology Dhanbad', location: 'Dhanbad, Jharkhand', state: 'Jharkhand', city: 'Dhanbad', nirf_rank: 16, type: 'IIT', established_year: 1926, website: 'https://www.iitism.ac.in' },
    { name: 'Indian Institute of Technology Palakkad', location: 'Palakkad, Kerala', state: 'Kerala', city: 'Palakkad', nirf_rank: 17, type: 'IIT', established_year: 2015, website: 'https://www.iitpkd.ac.in' },
    { name: 'Indian Institute of Technology Tirupati', location: 'Tirupati, Andhra Pradesh', state: 'Andhra Pradesh', city: 'Tirupati', nirf_rank: 18, type: 'IIT', established_year: 2015, website: 'https://www.iittp.ac.in' },
    { name: 'Indian Institute of Technology Goa', location: 'Goa, Goa', state: 'Goa', city: 'Goa', nirf_rank: 19, type: 'IIT', established_year: 2016, website: 'https://www.iitgoa.ac.in' },
    { name: 'Indian Institute of Technology Jammu', location: 'Jammu, Jammu and Kashmir', state: 'Jammu and Kashmir', city: 'Jammu', nirf_rank: 20, type: 'IIT', established_year: 2016, website: 'https://www.iitjammu.ac.in' },
    { name: 'Indian Institute of Technology Bhilai', location: 'Bhilai, Chhattisgarh', state: 'Chhattisgarh', city: 'Bhilai', nirf_rank: 21, type: 'IIT', established_year: 2016, website: 'https://www.iitbhilai.ac.in' },
    { name: 'Indian Institute of Technology Dharwad', location: 'Dharwad, Karnataka', state: 'Karnataka', city: 'Dharwad', nirf_rank: 22, type: 'IIT', established_year: 2016, website: 'https://www.iitdh.ac.in' },

    // NITs (Top 30)
    { name: 'National Institute of Technology Tiruchirappalli', location: 'Trichy, Tamil Nadu', state: 'Tamil Nadu', city: 'Tiruchirappalli', nirf_rank: 9, type: 'NIT', established_year: 1964, website: 'https://www.nitt.edu' },
    { name: 'National Institute of Technology Rourkela', location: 'Rourkela, Odisha', state: 'Odisha', city: 'Rourkela', nirf_rank: 10, type: 'NIT', established_year: 1961, website: 'https://www.nitrkl.ac.in' },
    { name: 'National Institute of Technology Surathkal', location: 'Mangalore, Karnataka', state: 'Karnataka', city: 'Mangalore', nirf_rank: 11, type: 'NIT', established_year: 1960, website: 'https://www.nitk.edu.in' },
    { name: 'National Institute of Technology Warangal', location: 'Warangal, Telangana', state: 'Telangana', city: 'Warangal', nirf_rank: 12, type: 'NIT', established_year: 1959, website: 'https://www.nitw.ac.in' },
    { name: 'National Institute of Technology Calicut', location: 'Calicut, Kerala', state: 'Kerala', city: 'Calicut', nirf_rank: 13, type: 'NIT', established_year: 1961, website: 'https://www.nitc.ac.in' },
    { name: 'National Institute of Technology Kurukshetra', location: 'Kurukshetra, Haryana', state: 'Haryana', city: 'Kurukshetra', nirf_rank: 14, type: 'NIT', established_year: 1963, website: 'https://www.nitkkr.ac.in' },
    { name: 'National Institute of Technology Jaipur', location: 'Jaipur, Rajasthan', state: 'Rajasthan', city: 'Jaipur', nirf_rank: 15, type: 'NIT', established_year: 1963, website: 'https://www.nitjaipur.ac.in' },
    { name: 'National Institute of Technology Nagpur', location: 'Nagpur, Maharashtra', state: 'Maharashtra', city: 'Nagpur', nirf_rank: 16, type: 'NIT', established_year: 1960, website: 'https://www.nitnagpur.ac.in' },
    { name: 'National Institute of Technology Allahabad', location: 'Allahabad, Uttar Pradesh', state: 'Uttar Pradesh', city: 'Allahabad', nirf_rank: 17, type: 'NIT', established_year: 1961, website: 'https://www.mnnit.ac.in' },
    { name: 'National Institute of Technology Hamirpur', location: 'Hamirpur, Himachal Pradesh', state: 'Himachal Pradesh', city: 'Hamirpur', nirf_rank: 18, type: 'NIT', established_year: 1986, website: 'https://www.nith.ac.in' },
    { name: 'National Institute of Technology Jalandhar', location: 'Jalandhar, Punjab', state: 'Punjab', city: 'Jalandhar', nirf_rank: 19, type: 'NIT', established_year: 1987, website: 'https://www.nitj.ac.in' },
    { name: 'National Institute of Technology Silchar', location: 'Silchar, Assam', state: 'Assam', city: 'Silchar', nirf_rank: 20, type: 'NIT', established_year: 1967, website: 'https://www.nits.ac.in' },
    { name: 'National Institute of Technology Patna', location: 'Patna, Bihar', state: 'Bihar', city: 'Patna', nirf_rank: 21, type: 'NIT', established_year: 2004, website: 'https://www.nitp.ac.in' },
    { name: 'National Institute of Technology Raipur', location: 'Raipur, Chhattisgarh', state: 'Chhattisgarh', city: 'Raipur', nirf_rank: 22, type: 'NIT', established_year: 1956, website: 'https://www.nitrr.ac.in' },
    { name: 'National Institute of Technology Agartala', location: 'Agartala, Tripura', state: 'Tripura', city: 'Agartala', nirf_rank: 23, type: 'NIT', established_year: 1965, website: 'https://www.nitta.ac.in' },
    { name: 'National Institute of Technology Durgapur', location: 'Durgapur, West Bengal', state: 'West Bengal', city: 'Durgapur', nirf_rank: 24, type: 'NIT', established_year: 1956, website: 'https://www.nitdgp.ac.in' },
    { name: 'National Institute of Technology Jamshedpur', location: 'Jamshedpur, Jharkhand', state: 'Jharkhand', city: 'Jamshedpur', nirf_rank: 25, type: 'NIT', established_year: 1960, website: 'https://www.nitjsr.ac.in' },
    { name: 'National Institute of Technology Manipur', location: 'Imphal, Manipur', state: 'Manipur', city: 'Imphal', nirf_rank: 26, type: 'NIT', established_year: 2010, website: 'https://www.nitmanipur.ac.in' },
    { name: 'National Institute of Technology Meghalaya', location: 'Shillong, Meghalaya', state: 'Meghalaya', city: 'Shillong', nirf_rank: 27, type: 'NIT', established_year: 2010, website: 'https://www.nitm.ac.in' },
    { name: 'National Institute of Technology Mizoram', location: 'Aizawl, Mizoram', state: 'Mizoram', city: 'Aizawl', nirf_rank: 28, type: 'NIT', established_year: 2010, website: 'https://www.nitmz.ac.in' },
    { name: 'National Institute of Technology Nagaland', location: 'Dimapur, Nagaland', state: 'Nagaland', city: 'Dimapur', nirf_rank: 29, type: 'NIT', established_year: 2010, website: 'https://www.nitnagaland.ac.in' },
    { name: 'National Institute of Technology Arunachal Pradesh', location: 'Yupia, Arunachal Pradesh', state: 'Arunachal Pradesh', city: 'Yupia', nirf_rank: 30, type: 'NIT', established_year: 2010, website: 'https://www.nitap.ac.in' },
    { name: 'National Institute of Technology Delhi', location: 'Delhi, Delhi', state: 'Delhi', city: 'Delhi', nirf_rank: 31, type: 'NIT', established_year: 2010, website: 'https://www.nitdelhi.ac.in' },
    { name: 'National Institute of Technology Goa', location: 'Goa, Goa', state: 'Goa', city: 'Goa', nirf_rank: 32, type: 'NIT', established_year: 2010, website: 'https://www.nitgoa.ac.in' },
    { name: 'National Institute of Technology Puducherry', location: 'Puducherry, Puducherry', state: 'Puducherry', city: 'Puducherry', nirf_rank: 33, type: 'NIT', established_year: 2010, website: 'https://www.nitpy.ac.in' },
    { name: 'National Institute of Technology Sikkim', location: 'Ravangla, Sikkim', state: 'Sikkim', city: 'Ravangla', nirf_rank: 34, type: 'NIT', established_year: 2010, website: 'https://www.nitsikkim.ac.in' },
    { name: 'National Institute of Technology Uttarakhand', location: 'Srinagar, Uttarakhand', state: 'Uttarakhand', city: 'Srinagar', nirf_rank: 35, type: 'NIT', established_year: 2010, website: 'https://www.nituk.ac.in' },
    { name: 'National Institute of Technology Andhra Pradesh', location: 'Tadepalligudem, Andhra Pradesh', state: 'Andhra Pradesh', city: 'Tadepalligudem', nirf_rank: 36, type: 'NIT', established_year: 2015, website: 'https://www.nitandhra.ac.in' },

    // IIITs and Other Top Colleges
    { name: 'International Institute of Information Technology Hyderabad', location: 'Hyderabad, Telangana', state: 'Telangana', city: 'Hyderabad', nirf_rank: 37, type: 'IIIT', established_year: 1998, website: 'https://www.iiit.ac.in' },
    { name: 'International Institute of Information Technology Bangalore', location: 'Bangalore, Karnataka', state: 'Karnataka', city: 'Bangalore', nirf_rank: 38, type: 'IIIT', established_year: 1999, website: 'https://www.iiitb.ac.in' },
    { name: 'Birla Institute of Technology and Science Pilani', location: 'Pilani, Rajasthan', state: 'Rajasthan', city: 'Pilani', nirf_rank: 39, type: 'Private', established_year: 1964, website: 'https://www.bits-pilani.ac.in' },
    { name: 'Vellore Institute of Technology', location: 'Vellore, Tamil Nadu', state: 'Tamil Nadu', city: 'Vellore', nirf_rank: 40, type: 'Private', established_year: 1984, website: 'https://www.vit.ac.in' },
    { name: 'SRM Institute of Science and Technology', location: 'Chennai, Tamil Nadu', state: 'Tamil Nadu', city: 'Chennai', nirf_rank: 41, type: 'Private', established_year: 1985, website: 'https://www.srmist.edu.in' },
    { name: 'Amrita Vishwa Vidyapeetham', location: 'Coimbatore, Tamil Nadu', state: 'Tamil Nadu', city: 'Coimbatore', nirf_rank: 42, type: 'Private', established_year: 2003, website: 'https://www.amrita.edu' },
    { name: 'Manipal Institute of Technology', location: 'Manipal, Karnataka', state: 'Karnataka', city: 'Manipal', nirf_rank: 43, type: 'Private', established_year: 1957, website: 'https://www.manipal.edu' },
    { name: 'PSG College of Technology', location: 'Coimbatore, Tamil Nadu', state: 'Tamil Nadu', city: 'Coimbatore', nirf_rank: 44, type: 'Private', established_year: 1951, website: 'https://www.psgtech.ac.in' },
    { name: 'College of Engineering Guindy', location: 'Chennai, Tamil Nadu', state: 'Tamil Nadu', city: 'Chennai', nirf_rank: 45, type: 'State', established_year: 1794, website: 'https://www.annauniv.edu' },
    { name: 'Jawaharlal Nehru Technological University Hyderabad', location: 'Hyderabad, Telangana', state: 'Telangana', city: 'Hyderabad', nirf_rank: 46, type: 'State', established_year: 1965, website: 'https://www.jntuh.ac.in' },
    { name: 'Andhra University College of Engineering', location: 'Visakhapatnam, Andhra Pradesh', state: 'Andhra Pradesh', city: 'Visakhapatnam', nirf_rank: 47, type: 'State', established_year: 1946, website: 'https://www.andhrauniversity.edu.in' },
    { name: 'Osmania University College of Engineering', location: 'Hyderabad, Telangana', state: 'Telangana', city: 'Hyderabad', nirf_rank: 48, type: 'State', established_year: 1929, website: 'https://www.osmania.ac.in' },
    { name: 'University College of Engineering Hyderabad', location: 'Hyderabad, Telangana', state: 'Telangana', city: 'Hyderabad', nirf_rank: 49, type: 'State', established_year: 1965, website: 'https://www.uceou.edu' },
    { name: 'PES University', location: 'Bangalore, Karnataka', state: 'Karnataka', city: 'Bangalore', nirf_rank: 50, type: 'Private', established_year: 1972, website: 'https://www.pes.edu' },
    { name: 'R V College of Engineering', location: 'Bangalore, Karnataka', state: 'Karnataka', city: 'Bangalore', nirf_rank: 51, type: 'Private', established_year: 1963, website: 'https://www.rvce.ac.in' },
    { name: 'BMS College of Engineering', location: 'Bangalore, Karnataka', state: 'Karnataka', city: 'Bangalore', nirf_rank: 52, type: 'Private', established_year: 1946, website: 'https://www.bmsce.ac.in' },
    { name: 'M S Ramaiah Institute of Technology', location: 'Bangalore, Karnataka', state: 'Karnataka', city: 'Bangalore', nirf_rank: 53, type: 'Private', established_year: 1962, website: 'https://www.msrit.edu' },
    { name: 'Chaitanya Bharathi Institute of Technology', location: 'Hyderabad, Telangana', state: 'Telangana', city: 'Hyderabad', nirf_rank: 54, type: 'Private', established_year: 1979, website: 'https://www.cbit.ac.in' },
    { name: 'Vasavi College of Engineering', location: 'Hyderabad, Telangana', state: 'Telangana', city: 'Hyderabad', nirf_rank: 55, type: 'Private', established_year: 1981, website: 'https://www.vasavi.ac.in' },
    { name: 'Gokaraju Rangaraju Institute of Engineering and Technology', location: 'Hyderabad, Telangana', state: 'Telangana', city: 'Hyderabad', nirf_rank: 56, type: 'Private', established_year: 1997, website: 'https://www.griet.ac.in' },
    { name: 'Maharaja Engineering College', location: 'Coimbatore, Tamil Nadu', state: 'Tamil Nadu', city: 'Coimbatore', nirf_rank: 57, type: 'Private', established_year: 1994, website: 'https://www.maheng.ac.in' },
    { name: 'Kongu Engineering College', location: 'Erode, Tamil Nadu', state: 'Tamil Nadu', city: 'Erode', nirf_rank: 58, type: 'Private', established_year: 1984, website: 'https://www.kongu.ac.in' },
    { name: 'Sona College of Technology', location: 'Salem, Tamil Nadu', state: 'Tamil Nadu', city: 'Salem', nirf_rank: 59, type: 'Private', established_year: 1997, website: 'https://www.sonatech.ac.in' },
    { name: 'Kumaraguru College of Technology', location: 'Coimbatore, Tamil Nadu', state: 'Tamil Nadu', city: 'Coimbatore', nirf_rank: 60, type: 'Private', established_year: 1984, website: 'https://www.kct.ac.in' },
    { name: 'Sri Krishna College of Engineering and Technology', location: 'Coimbatore, Tamil Nadu', state: 'Tamil Nadu', city: 'Coimbatore', nirf_rank: 61, type: 'Private', established_year: 1998, website: 'https://www.skct.edu.in' },
    { name: 'Park College of Engineering and Technology', location: 'Coimbatore, Tamil Nadu', state: 'Tamil Nadu', city: 'Coimbatore', nirf_rank: 62, type: 'Private', established_year: 1997, website: 'https://www.park.ac.in' },
    { name: 'PSG Institute of Technology and Applied Research', location: 'Coimbatore, Tamil Nadu', state: 'Tamil Nadu', city: 'Coimbatore', nirf_rank: 63, type: 'Private', established_year: 2011, website: 'https://www.psgitech.ac.in' },
    { name: 'Sri Ramakrishna Engineering College', location: 'Coimbatore, Tamil Nadu', state: 'Tamil Nadu', city: 'Coimbatore', nirf_rank: 64, type: 'Private', established_year: 1994, website: 'https:// www.srec.ac.in' },
    { name: 'Karpagam College of Engineering', location: 'Coimbatore, Tamil Nadu', state: 'Tamil Nadu', city: 'Coimbatore', nirf_rank: 65, type: 'Private', established_year: 2000, website: 'https://www.kce.ac.in' },
    { name: 'Hindusthan College of Engineering and Technology', location: 'Coimbatore, Tamil Nadu', state: 'Tamil Nadu', city: 'Coimbatore', nirf_rank: 66, type: 'Private', established_year: 1998, website: 'https://www.hindusthan.net' },
    { name: 'Info Institute of Engineering', location: 'Coimbatore, Tamil Nadu', state: 'Tamil Nadu', city: 'Coimbatore', nirf_rank: 67, type: 'Private', established_year: 2007, website: 'https://www.infoengg.ac.in' },
    { name: 'KPR Institute of Engineering and Technology', location: 'Coimbatore, Tamil Nadu', state: 'Tamil Nadu', city: 'Coimbatore', nirf_rank: 68, type: 'Private', established_year: 2009, website: 'https://www.kpriet.ac.in' },
    { name: 'Sri Shakthi Institute of Engineering and Technology', location: 'Coimbatore, Tamil Nadu', state: 'Tamil Nadu', city: 'Coimbatore', nirf_rank: 69, type: 'Private', established_year: 2006, website: 'https://www.siet.ac.in' },
    { name: 'Adhiyamaan College of Engineering', location: 'Hosur, Tamil Nadu', state: 'Tamil Nadu', city: 'Hosur', nirf_rank: 70, type: 'Private', established_year: 1987, website: 'https://www.adhiyamaan.ac.in' },
    { name: 'Mookambigai College of Engineering', location: 'Kalamavoor, Tamil Nadu', state: 'Tamil Nadu', city: 'Kalamavoor', nirf_rank: 71, type: 'Private', established_year: 1998, website: 'https://www.mookambigai.ac.in' },
    { name: 'Paavai Engineering College', location: 'Namakkal, Tamil Nadu', state: 'Tamil Nadu', city: 'Namakkal', nirf_rank: 72, type: 'Private', established_year: 1998, website: 'https://www.paavai.ac.in' },
    { name: 'Mahendra Institute of Technology', location: 'Mallasamudram, Tamil Nadu', state: 'Tamil Nadu', city: 'Mallasamudram', nirf_rank: 73, type: 'Private', established_year: 2009, website: 'https://www.mahendra.ac.in' },
    { name: 'Vellalar College of Engineering and Technology', location: 'Erode, Tamil Nadu', state: 'Tamil Nadu', city: 'Erode', nirf_rank: 74, type: 'Private', established_year: 1998, website: 'https://www.vellalarengg.ac.in' },
    { name: 'PSG College of Technology', location: 'Coimbatore, Tamil Nadu', state: 'Tamil Nadu', city: 'Coimbatore', nirf_rank: 75, type: 'Private', established_year: 1951, website: 'https://www.psgtech.edu' }
];

// Sample cutoff data
const cutoffData = [
    // JEE Advanced cutoffs for top IITs
    { college_id: 1, exam_id: 2, branch_id: 1, category: 'General', rank: 100, year: 2023, round: 1 },
    { college_id: 1, exam_id: 2, branch_id: 2, category: 'General', rank: 250, year: 2023, round: 1 },
    { college_id: 1, exam_id: 2, branch_id: 3, category: 'General', rank: 500, year: 2023, round: 1 },
    
    { college_id: 2, exam_id: 2, branch_id: 1, category: 'General', rank: 150, year: 2023, round: 1 },
    { college_id: 2, exam_id: 2, branch_id: 2, category: 'General', rank: 300, year: 2023, round: 1 },
    { college_id: 2, exam_id: 2, branch_id: 3, category: 'General', rank: 600, year: 2023, round: 1 },
    
    { college_id: 3, exam_id: 2, branch_id: 1, category: 'General', rank: 200, year: 2023, round: 1 },
    { college_id: 3, exam_id: 2, branch_id: 2, category: 'General', rank: 400, year: 2023, round: 1 },
    { college_id: 3, exam_id: 2, branch_id: 3, category: 'General', rank: 800, year: 2023, round: 1 },
    
    // JEE Main cutoffs for NITs
    { college_id: 24, exam_id: 1, branch_id: 1, category: 'General', rank: 5000, year: 2023, round: 1 },
    { college_id: 24, exam_id: 1, branch_id: 2, category: 'General', rank: 8000, year: 2023, round: 1 },
    { college_id: 24, exam_id: 1, branch_id: 3, category: 'General', rank: 12000, year: 2023, round: 1 },
    
    { college_id: 25, exam_id: 1, branch_id: 1, category: 'General', rank: 6000, year: 2023, round: 1 },
    { college_id: 25, exam_id: 1, branch_id: 2, category: 'General', rank: 9000, year: 2023, round: 1 },
    { college_id: 25, exam_id: 1, branch_id: 3, category: 'General', rank: 14000, year: 2023, round: 1 },
    
    // EAMCET cutoffs for Telangana colleges
    { college_id: 46, exam_id: 3, branch_id: 1, category: 'General', rank: 1000, year: 2023, round: 1 },
    { college_id: 46, exam_id: 3, branch_id: 2, category: 'General', rank: 1500, year: 2023, round: 1 },
    { college_id: 46, exam_id: 3, branch_id: 3, category: 'General', rank: 2000, year: 2023, round: 1 },
    
    // BITSAT cutoffs
    { college_id: 40, exam_id: 4, branch_id: 1, category: 'General', rank: 300, year: 2023, round: 1 },
    { college_id: 40, exam_id: 4, branch_id: 2, category: 'General', rank: 350, year: 2023, round: 1 },
    { college_id: 40, exam_id: 4, branch_id: 3, category: 'General', rank: 400, year: 2023, round: 1 }
];

// Insert extended college data
const insertColleges = () => {
    const collegeStmt = db.prepare('INSERT OR IGNORE INTO colleges (name, location, state, city, nirf_rank, type, established_year) VALUES (?, ?, ?, ?, ?, ?, ?)');
    
    colleges.forEach(college => {
        collegeStmt.run([
            college.name, 
            college.location, 
            college.state, 
            college.city, 
            college.nirf_rank, 
            college.type, 
            college.established_year
        ]);
    });
    
    collegeStmt.finalize();
    console.log('Extended college data inserted successfully.');
};

// Insert cutoff data
const insertCutoffs = () => {
    const cutoffStmt = db.prepare('INSERT OR IGNORE INTO cutoffs (college_id, exam_id, branch_id, category, rank, year, round) VALUES (?, ?, ?, ?, ?, ?, ?)');
    
    cutoffData.forEach(cutoff => {
        cutoffStmt.run([
            cutoff.college_id,
            cutoff.exam_id,
            cutoff.branch_id,
            cutoff.category,
            cutoff.rank,
            cutoff.year,
            cutoff.round
        ]);
    });
    
    cutoffStmt.finalize();
    console.log('Cutoff data inserted successfully.');
};

// Populate database
const populateDatabase = () => {
    console.log('Starting database population...');
    
    insertColleges();
    
    setTimeout(() => {
        insertCutoffs();
        
        setTimeout(() => {
            console.log('Database population completed.');
            db.close((err) => {
                if (err) {
                    console.error('Error closing database:', err.message);
                } else {
                    console.log('Database connection closed.');
                }
            });
        }, 1000);
    }, 1000);
};

// Run population
populateDatabase();
