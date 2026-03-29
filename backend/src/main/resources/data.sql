-- Insert comprehensive colleges data for all India
INSERT INTO colleges (name, location, state, city, type, established_year, nirf_rank, website, exam_short_name, created_at, updated_at) VALUES
-- IITs (23 total)
('Indian Institute of Technology Madras', 'Chennai, Tamil Nadu', 'Tamil Nadu', 'Chennai', 'IIT', 1959, 1, 'https://www.iitm.ac.in', 'JEE Advanced', NOW(), NOW()),
('Indian Institute of Technology Delhi', 'New Delhi, Delhi', 'Delhi', 'New Delhi', 'IIT', 1961, 2, 'https://www.iitd.ac.in', 'JEE Advanced', NOW(), NOW()),
('Indian Institute of Technology Bombay', 'Mumbai, Maharashtra', 'Maharashtra', 'Mumbai', 'IIT', 1958, 3, 'https://www.iitb.ac.in', 'JEE Advanced', NOW(), NOW()),
('Indian Institute of Technology Kanpur', 'Kanpur, Uttar Pradesh', 'Uttar Pradesh', 'Kanpur', 'IIT', 1959, 4, 'https://www.iitk.ac.in', 'JEE Advanced', NOW(), NOW()),
('Indian Institute of Technology Roorkee', 'Roorkee, Uttarakhand', 'Uttarakhand', 'Roorkee', 'IIT', 1847, 5, 'https://www.iitr.ac.in', 'JEE Advanced', NOW(), NOW()),
('Indian Institute of Technology Kharagpur', 'Kharagpur, West Bengal', 'West Bengal', 'Kharagpur', 'IIT', 1951, 6, 'https://www.iitkgp.ac.in', 'JEE Advanced', NOW(), NOW()),
('Indian Institute of Technology Guwahati', 'Guwahati, Assam', 'Assam', 'Guwahati', 'IIT', 1994, 7, 'https://www.iitg.ac.in', 'JEE Advanced', NOW(), NOW()),
('Indian Institute of Technology Hyderabad', 'Hyderabad, Telangana', 'Telangana', 'Hyderabad', 'IIT', 2008, 8, 'https://www.iith.ac.in', 'JEE Advanced', NOW(), NOW()),
('Indian Institute of Technology Indore', 'Indore, Madhya Pradesh', 'Madhya Pradesh', 'Indore', 'IIT', 2009, 9, 'https://www.iiti.ac.in', 'JEE Advanced', NOW(), NOW()),
('Indian Institute of Technology Gandhinagar', 'Gandhinagar, Gujarat', 'Gujarat', 'Gandhinagar', 'IIT', 2008, 10, 'https://www.iitgn.ac.in', 'JEE Advanced', NOW(), NOW()),
('Indian Institute of Technology Ropar', 'Ropar, Punjab', 'Punjab', 'Ropar', 'IIT', 2008, 11, 'https://www.iitrpr.ac.in', 'JEE Advanced', NOW(), NOW()),
('Indian Institute of Technology Patna', 'Patna, Bihar', 'Bihar', 'Patna', 'IIT', 2008, 12, 'https://www.iitp.ac.in', 'JEE Advanced', NOW(), NOW()),
('Indian Institute of Technology Bhubaneswar', 'Bhubaneswar, Odisha', 'Odisha', 'Bhubaneswar', 'IIT', 2008, 13, 'https://www.iitbbs.ac.in', 'JEE Advanced', NOW(), NOW()),
('Indian Institute of Technology Jodhpur', 'Jodhpur, Rajasthan', 'Rajasthan', 'Jodhpur', 'IIT', 2008, 14, 'https://www.iitj.ac.in', 'JEE Advanced', NOW(), NOW()),
('Indian Institute of Technology Mandi', 'Mandi, Himachal Pradesh', 'Himachal Pradesh', 'Mandi', 'IIT', 2009, 15, 'https://www.iitmandi.ac.in', 'JEE Advanced', NOW(), NOW()),
('Indian Institute of Technology Dhanbad', 'Dhanbad, Jharkhand', 'Jharkhand', 'Dhanbad', 'IIT', 1926, 16, 'https://www.iitism.ac.in', 'JEE Advanced', NOW(), NOW()),
('Indian Institute of Technology Palakkad', 'Palakkad, Kerala', 'Kerala', 'Palakkad', 'IIT', 2015, 17, 'https://www.iitpkd.ac.in', 'JEE Advanced', NOW(), NOW()),
('Indian Institute of Technology Tirupati', 'Tirupati, Andhra Pradesh', 'Andhra Pradesh', 'Tirupati', 'IIT', 2015, 18, 'https://www.iittp.ac.in', 'JEE Advanced', NOW(), NOW()),
('Indian Institute of Technology Goa', 'Goa, Goa', 'Goa', 'Goa', 'IIT', 2016, 19, 'https://www.iitgoa.ac.in', 'JEE Advanced', NOW(), NOW()),
('Indian Institute of Technology Jammu', 'Jammu, Jammu and Kashmir', 'Jammu and Kashmir', 'Jammu', 'IIT', 2016, 20, 'https://www.iitjammu.ac.in', 'JEE Advanced', NOW(), NOW()),
('Indian Institute of Technology Bhilai', 'Bhilai, Chhattisgarh', 'Chhattisgarh', 'Bhilai', 'IIT', 2016, 21, 'https://www.iitbhilai.ac.in', 'JEE Advanced', NOW(), NOW()),
('Indian Institute of Technology Dharwad', 'Dharwad, Karnataka', 'Karnataka', 'Dharwad', 'IIT', 2016, 22, 'https://www.iitdh.ac.in', 'JEE Advanced', NOW(), NOW()),

-- NITs (31 total)
('National Institute of Technology Tiruchirappalli', 'Tiruchirappalli, Tamil Nadu', 'Tamil Nadu', 'Tiruchirappalli', 'NIT', 1964, 9, 'https://www.nitt.edu', 'JEE Main', NOW(), NOW()),
('National Institute of Technology Rourkela', 'Rourkela, Odisha', 'Odisha', 'Rourkela', 'NIT', 1961, 10, 'https://www.nitrkl.ac.in', 'JEE Main', NOW(), NOW()),
('National Institute of Technology Surathkal', 'Mangalore, Karnataka', 'Karnataka', 'Mangalore', 'NIT', 1960, 11, 'https://www.nitk.edu.in', 'JEE Main', NOW(), NOW()),
('National Institute of Technology Warangal', 'Warangal, Telangana', 'Telangana', 'Warangal', 'NIT', 1959, 12, 'https://www.nitw.ac.in', 'JEE Main', NOW(), NOW()),
('National Institute of Technology Calicut', 'Calicut, Kerala', 'Kerala', 'Calicut', 'NIT', 1961, 13, 'https://www.nitc.ac.in', 'JEE Main', NOW(), NOW()),
('National Institute of Technology Kurukshetra', 'Kurukshetra, Haryana', 'Haryana', 'Kurukshetra', 'NIT', 1963, 14, 'https://www.nitkkr.ac.in', 'JEE Main', NOW(), NOW()),
('National Institute of Technology Jaipur', 'Jaipur, Rajasthan', 'Rajasthan', 'Jaipur', 'NIT', 1963, 15, 'https://www.nitjaipur.ac.in', 'JEE Main', NOW(), NOW()),
('National Institute of Technology Nagpur', 'Nagpur, Maharashtra', 'Maharashtra', 'Nagpur', 'NIT', 1960, 16, 'https://www.nitnagpur.ac.in', 'JEE Main', NOW(), NOW()),
('National Institute of Technology Allahabad', 'Prayagraj, Uttar Pradesh', 'Uttar Pradesh', 'Prayagraj', 'NIT', 1961, 17, 'https://www.mnnit.ac.in', 'JEE Main', NOW(), NOW()),
('National Institute of Technology Hamirpur', 'Hamirpur, Himachal Pradesh', 'Himachal Pradesh', 'Hamirpur', 'NIT', 1986, 18, 'https://www.nith.ac.in', 'JEE Main', NOW(), NOW()),
('National Institute of Technology Jalandhar', 'Jalandhar, Punjab', 'Punjab', 'Jalandhar', 'NIT', 1987, 19, 'https://www.nitj.ac.in', 'JEE Main', NOW(), NOW()),
('National Institute of Technology Silchar', 'Silchar, Assam', 'Assam', 'Silchar', 'NIT', 1967, 20, 'https://www.nits.ac.in', 'JEE Main', NOW(), NOW()),
('National Institute of Technology Patna', 'Patna, Bihar', 'Bihar', 'Patna', 'NIT', 2004, 21, 'https://www.nitp.ac.in', 'JEE Main', NOW(), NOW()),
('National Institute of Technology Raipur', 'Raipur, Chhattisgarh', 'Chhattisgarh', 'Raipur', 'NIT', 1956, 22, 'https://www.nitrr.ac.in', 'JEE Main', NOW(), NOW()),
('National Institute of Technology Agartala', 'Agartala, Tripura', 'Tripura', 'Agartala', 'NIT', 1965, 23, 'https://www.nitta.ac.in', 'JEE Main', NOW(), NOW()),
('National Institute of Technology Durgapur', 'Durgapur, West Bengal', 'West Bengal', 'Durgapur', 'NIT', 1956, 24, 'https://www.nitdgp.ac.in', 'JEE Main', NOW(), NOW()),
('National Institute of Technology Jamshedpur', 'Jamshedpur, Jharkhand', 'Jharkhand', 'Jamshedpur', 'NIT', 1960, 25, 'https://www.nitjsr.ac.in', 'JEE Main', NOW(), NOW()),
('National Institute of Technology Manipur', 'Imphal, Manipur', 'Manipur', 'Imphal', 'NIT', 2010, 26, 'https://www.nitmanipur.ac.in', 'JEE Main', NOW(), NOW()),
('National Institute of Technology Meghalaya', 'Shillong, Meghalaya', 'Meghalaya', 'Shillong', 'NIT', 2010, 27, 'https://www.nitm.ac.in', 'JEE Main', NOW(), NOW()),
('National Institute of Technology Mizoram', 'Aizawl, Mizoram', 'Mizoram', 'Aizawl', 'NIT', 2010, 28, 'https://www.nitmz.ac.in', 'JEE Main', NOW(), NOW()),
('National Institute of Technology Nagaland', 'Dimapur, Nagaland', 'Nagaland', 'Dimapur', 'NIT', 2010, 29, 'https://www.nitnagaland.ac.in', 'JEE Main', NOW(), NOW()),
('National Institute of Technology Arunachal Pradesh', 'Yupia, Arunachal Pradesh', 'Arunachal Pradesh', 'Yupia', 'NIT', 2010, 30, 'https://www.nitap.ac.in', 'JEE Main', NOW(), NOW()),
('National Institute of Technology Delhi', 'Delhi, Delhi', 'Delhi', 'Delhi', 'NIT', 2010, 31, 'https://www.nitdelhi.ac.in', 'JEE Main', NOW(), NOW()),
('National Institute of Technology Goa', 'Goa, Goa', 'Goa', 'Goa', 'NIT', 2010, 32, 'https://www.nitgoa.ac.in', 'JEE Main', NOW(), NOW()),
('National Institute of Technology Puducherry', 'Puducherry, Puducherry', 'Puducherry', 'Puducherry', 'NIT', 2010, 33, 'https://www.nitpy.ac.in', 'JEE Main', NOW(), NOW()),
('National Institute of Technology Sikkim', 'Ravangla, Sikkim', 'Sikkim', 'Ravangla', 'NIT', 2010, 34, 'https://www.nitsikkim.ac.in', 'JEE Main', NOW(), NOW()),
('National Institute of Technology Uttarakhand', 'Srinagar, Uttarakhand', 'Uttarakhand', 'Srinagar', 'NIT', 2010, 35, 'https://www.nituk.ac.in', 'JEE Main', NOW(), NOW()),
('National Institute of Technology Andhra Pradesh', 'Tadepalligudem, Andhra Pradesh', 'Andhra Pradesh', 'Tadepalligudem', 'NIT', 2015, 36, 'https://www.nitandhra.ac.in', 'JEE Main', NOW(), NOW()),

-- IIITs and Other Top Colleges
('International Institute of Information Technology Hyderabad', 'Hyderabad, Telangana', 'Telangana', 'Hyderabad', 'IIIT', 1998, 37, 'https://www.iiit.ac.in', 'JEE Main', NOW(), NOW()),
('International Institute of Information Technology Bangalore', 'Bangalore, Karnataka', 'Karnataka', 'Bangalore', 'IIIT', 1999, 38, 'https://www.iiitb.ac.in', 'JEE Main', NOW(), NOW()),
('Birla Institute of Technology and Science Pilani', 'Pilani, Rajasthan', 'Rajasthan', 'Pilani', 'Private', 1964, 39, 'https://www.bits-pilani.ac.in', 'BITSAT', NOW(), NOW()),
('Vellore Institute of Technology', 'Vellore, Tamil Nadu', 'Tamil Nadu', 'Vellore', 'Private', 1984, 40, 'https://www.vit.ac.in', 'VITEEE', NOW(), NOW()),
('SRM Institute of Science and Technology', 'Chennai, Tamil Nadu', 'Tamil Nadu', 'Chennai', 'Private', 1985, 41, 'https://www.srmist.edu.in', 'SRMJEEE', NOW(), NOW()),
('Amrita Vishwa Vidyapeetham', 'Coimbatore, Tamil Nadu', 'Tamil Nadu', 'Coimbatore', 'Private', 2003, 42, 'https://www.amrita.edu', 'AEEE', NOW(), NOW()),
('Manipal Institute of Technology', 'Manipal, Karnataka', 'Karnataka', 'Manipal', 'Private', 1957, 43, 'https://www.manipal.edu', 'MU-OET', NOW(), NOW()),
('PSG College of Technology', 'Coimbatore, Tamil Nadu', 'Tamil Nadu', 'Coimbatore', 'Private', 1951, 44, 'https://www.psgtech.ac.in', 'TNEA', NOW(), NOW()),
('College of Engineering Guindy', 'Chennai, Tamil Nadu', 'Tamil Nadu', 'Chennai', 'State', 1794, 45, 'https://www.annauniv.edu', 'TNEA', NOW(), NOW()),
('Jawaharlal Nehru Technological University Hyderabad', 'Hyderabad, Telangana', 'Telangana', 'Hyderabad', 'State', 1965, 46, 'https://www.jntuh.ac.in', 'TS EAMCET', NOW(), NOW()),

-- Additional State Government Colleges
('Andhra University College of Engineering', 'Visakhapatnam, Andhra Pradesh', 'Andhra Pradesh', 'Visakhapatnam', 'State', 1946, 47, 'https://www.andhrauniversity.edu.in', 'AP EAMCET', NOW(), NOW()),
('Osmania University College of Engineering', 'Hyderabad, Telangana', 'Telangana', 'Hyderabad', 'State', 1929, 48, 'https://www.osmania.ac.in', 'TS EAMCET', NOW(), NOW()),
('University College of Engineering Hyderabad', 'Hyderabad, Telangana', 'Telangana', 'Hyderabad', 'State', 1965, 49, 'https://www.uceou.edu', 'TS EAMCET', NOW(), NOW()),
('PES University', 'Bangalore, Karnataka', 'Karnataka', 'Bangalore', 'Private', 1972, 50, 'https://www.pes.edu', 'KCET', NOW(), NOW()),
('R V College of Engineering', 'Bangalore, Karnataka', 'Karnataka', 'Bangalore', 'Private', 1963, 51, 'https://www.rvce.ac.in', 'KCET', NOW(), NOW()),
('BMS College of Engineering', 'Bangalore, Karnataka', 'Karnataka', 'Bangalore', 'Private', 1946, 52, 'https://www.bmsce.ac.in', 'KCET', NOW(), NOW()),
('M S Ramaiah Institute of Technology', 'Bangalore, Karnataka', 'Karnataka', 'Bangalore', 'Private', 1962, 53, 'https://www.msrit.edu', 'KCET', NOW(), NOW()),

-- More Private Colleges
('Chaitanya Bharathi Institute of Technology', 'Hyderabad, Telangana', 'Telangana', 'Hyderabad', 'Private', 1979, 54, 'https://www.cbit.ac.in', 'TS EAMCET', NOW(), NOW()),
('Vasavi College of Engineering', 'Hyderabad, Telangana', 'Telangana', 'Hyderabad', 'Private', 1981, 55, 'https://www.vasavi.ac.in', 'TS EAMCET', NOW(), NOW()),
('Gokaraju Rangaraju Institute of Engineering and Technology', 'Hyderabad, Telangana', 'Telangana', 'Hyderabad', 'Private', 1997, 56, 'https://www.griet.ac.in', 'TS EAMCET', NOW(), NOW()),

-- Tamil Nadu Engineering Colleges
('Kongu Engineering College', 'Erode, Tamil Nadu', 'Tamil Nadu', 'Erode', 'Private', 1984, 57, 'https://www.kongu.ac.in', 'TNEA', NOW(), NOW()),
('Sona College of Technology', 'Salem, Tamil Nadu', 'Tamil Nadu', 'Salem', 'Private', 1997, 'https://www.sonatech.ac.in', 'TNEA', NOW(), NOW()),
('Kumaraguru College of Technology', 'Coimbatore, Tamil Nadu', 'Tamil Nadu', 'Coimbatore', 'Private', 1984, 'https://www.kct.ac.in', 'TNEA', NOW(), NOW()),
('Sri Krishna College of Engineering and Technology', 'Coimbatore, Tamil Nadu', 'Tamil Nadu', 'Coimbatore', 'Private', 1998, 'https://www.skct.edu.in', 'TNEA', NOW(), NOW()),

-- Maharashtra Colleges
('College of Engineering Pune', 'Pune, Maharashtra', 'Maharashtra', 'Pune', 'Govt', 1854, 58, 'https://www.coep.org.in', 'MHT-CET', NOW(), NOW()),
('Sardar Patel Institute of Technology', 'Mumbai, Maharashtra', 'Maharashtra', 'Mumbai', 'Govt', 1962, 59, 'https://www.spit.ac.in', 'MHT-CET', NOW(), NOW()),
('Veermata Jijabai Technological Institute', 'Mumbai, Maharashtra', 'Maharashtra', 'Mumbai', 'Govt', 1887, 60, 'https://www.vjti.org.in', 'MHT-CET', NOW(), NOW()),

-- Delhi Colleges
('Delhi Technological University', 'Delhi, Delhi', 'Delhi', 'Delhi', 'Govt', 1941, 61, 'https://www.dtu.ac.in', 'JEE Main', NOW(), NOW()),
('Netaji Subhas University of Technology', 'Delhi, Delhi', 'Delhi', 'Delhi', 'Govt', 1983, 62, 'https://www.nsut.ac.in', 'JEE Main', NOW(), NOW()),

-- West Bengal Colleges
('Jadavpur University', 'Kolkata, West Bengal', 'West Bengal', 'Kolkata', 'Govt', 1955, 63, 'https://www.jadavpuruniversity.in', 'WBJEE', NOW(), NOW()),
('University of Calcutta', 'Kolkata, West Bengal', 'West Bengal', 'Kolkata', 'Govt', 1857, 64, 'https://www.caluniv.ac.in', 'WBJEE', NOW(), NOW()),

-- Uttar Pradesh Colleges
('Indian Institute of Technology (BHU) Varanasi', 'Varanasi, Uttar Pradesh', 'Uttar Pradesh', 'Varanasi', 'IIT', 1919, 65, 'https://www.iitbhu.ac.in', 'JEE Advanced', NOW(), NOW()),
('Motilal Nehru National Institute of Technology Allahabad', 'Prayagraj, Uttar Pradesh', 'Uttar Pradesh', 'Prayagraj', 'NIT', 1961, 66, 'https://www.mnnit.ac.in', 'JEE Main', NOW(), NOW()),

-- Gujarat Colleges
('Dhirubhai Ambani Institute of Information and Communication Technology', 'Gandhinagar, Gujarat', 'Gujarat', 'Gandhinagar', 'Private', 2001, 67, 'https://www.daiict.ac.in', 'JEE Main', NOW(), NOW()),
('Institute of Technology, Nirma University', 'Ahmedabad, Gujarat', 'Gujarat', 'Ahmedabad', 'Private', 1995, 68, 'https://www.nirmauni.ac.in', 'GUJCET', NOW(), NOW()),

-- Punjab Colleges
('Punjab Engineering College', 'Chandigarh, Punjab', 'Punjab', 'Chandigarh', 'Govt', 1921, 69, 'https://www.pec.ac.in', 'JEE Main', NOW(), NOW()),
('Thapar Institute of Engineering and Technology', 'Patiala, Punjab', 'Punjab', 'Patiala', 'Private', 1956, 70, 'https://www.thapar.edu', 'JEE Main', NOW(), NOW()),

-- Kerala Colleges
('College of Engineering Trivandrum', 'Thiruvananthapuram, Kerala', 'Kerala', 'Thiruvananthapuram', 'Govt', 1939, 71, 'https://www.cet.ac.in', 'KEAM', NOW(), NOW()),
('Government College of Engineering Kannur', 'Kannur, Kerala', 'Kerala', 'Kannur', 'Govt', 1986, 72, 'https://www.geckkd.ac.in', 'KEAM', NOW(), NOW()),

-- Rajasthan Colleges
('Malaviya National Institute of Technology Jaipur', 'Jaipur, Rajasthan', 'Rajasthan', 'Jaipur', 'NIT', 1963, 73, 'https://www.mnit.ac.in', 'JEE Main', NOW(), NOW()),
('Birla Institute of Technology and Science Pilani', 'Pilani, Rajasthan', 'Rajasthan', 'Pilani', 'Private', 1964, 74, 'https://www.bits-pilani.ac.in', 'BITSAT', NOW(), NOW()),

-- Additional Colleges for Comprehensive Coverage
('International Institute of Information Technology Design and Manufacturing, Kurnool', 'Kurnool, Andhra Pradesh', 'Andhra Pradesh', 'Kurnool', 'IIIT', 2015, 75, 'https://www.iiitdmk.ac.in', 'JEE Main', NOW(), NOW()),
('International Institute of Information Technology Design and Manufacturing, Chennai', 'Chennai, Tamil Nadu', 'Tamil Nadu', 'Chennai', 'IIIT', 2015, 76, 'https://www.iiitdm.ac.in', 'JEE Main', NOW(), NOW()),
('International Institute of Information Technology, Sri City', 'Sri City, Andhra Pradesh', 'Andhra Pradesh', 'Sri City', 'IIIT', 2013, 77, 'https://www.iiits.ac.in', 'JEE Main', NOW(), NOW()),
('Indian Institute of Information Technology, Kalyani', 'Kalyani, West Bengal', 'West Bengal', 'Kalyani', 'IIIT', 2014, 78, 'https://www.iiitkalyani.ac.in', 'JEE Main', NOW(), NOW()),
('Indian Institute of Information Technology, Ranchi', 'Ranchi, Jharkhand', 'Jharkhand', 'Ranchi', 'IIIT', 2016, 79, 'https://www.iiitranchi.ac.in', 'JEE Main', NOW(), NOW()),
('Indian Institute of Information Technology, Una', 'Una, Himachal Pradesh', 'Himachal Pradesh', 'Una', 'IIIT', 2017, 80, 'https://www.iiituna.ac.in', 'JEE Main', NOW(), NOW()),

-- More Top Private Colleges
('Vellore Institute of Technology, Bhopal', 'Bhopal, Madhya Pradesh', 'Madhya Pradesh', 'Bhopal', 'Private', 2003, 81, 'https://vitbhopal.ac.in', 'VITEEE', NOW(), NOW()),
('Vellore Institute of Technology, Chennai', 'Chennai, Tamil Nadu', 'Tamil Nadu', 'Chennai', 'Private', 2010, 82, 'https://vitbhopal.ac.in', 'VITEEE', NOW(), NOW()),
('Amrita Vishwa Vidyapeetham, Amritapuri', 'Kollam, Kerala', 'Kerala', 'Kollam', 'Private', 2003, 83, 'https://www.amrita.edu', 'AEEE', NOW(), NOW()),
('Amrita Vishwa Vidyapeetham, Coimbatore', 'Coimbatore, Tamil Nadu', 'Tamil Nadu', 'Coimbatore', 'Private', 2003, 84, 'https://www.amrita.edu', 'AEEE', NOW(), NOW()),
('Amrita Vishwa Vidyapeetham, Bangalore', 'Bangalore, Karnataka', 'Karnataka', 'Bangalore', 'Private', 2003, 85, 'https://www.amrita.edu', 'AEEE', NOW(), NOW()),

-- State Government Colleges
('Government College of Engineering, Amravati', 'Amravati, Maharashtra', 'Maharashtra', 'Amravati', 'Govt', 1964, 86, 'https://www.geca.ac.in', 'MHT-CET', NOW(), NOW()),
('Government College of Engineering, Aurangabad', 'Aurangabad, Maharashtra', 'Maharashtra', 'Aurangabad', 'Govt', 1960, 87, 'https://www.geca.ac.in', 'MHT-CET', NOW(), NOW()),
('Government College of Engineering, Karad', 'Karad, Maharashtra', 'Maharashtra', 'Karad', 'Govt', 1960, 88, 'https://www.geck.ac.in', 'MHT-CET', NOW(), NOW()),

-- Additional Private Colleges
('Loyola-ICAM College of Engineering and Technology', 'Chennai, Tamil Nadu', 'Tamil Nadu', 'Chennai', 'Private', 2010, 89, 'https://www.loyolaicam.ac.in', 'TNEA', NOW(), NOW()),
('Sathyabama Institute of Science and Technology', 'Chennai, Tamil Nadu', 'Tamil Nadu', 'Chennai', 'Private', 1987, 90, 'https://www.sathyabama.ac.in', 'TNEA', NOW(), NOW()),
('Vel Tech Rangarajan Dr. Sagunthala R&D Institute of Science and Technology', 'Chennai, Tamil Nadu', 'Tamil Nadu', 'Chennai', 'Private', 1997, 91, 'https://www.veltech.edu.in', 'TNEA', NOW(), NOW()),

-- Karnataka Colleges
('R V College of Engineering', 'Bangalore, Karnataka', 'Karnataka', 'Bangalore', 'Private', 1963, 92, 'https://www.rvce.ac.in', 'KCET', NOW(), NOW()),
('B M S College of Engineering', 'Bangalore, Karnataka', 'Karnataka', 'Bangalore', 'Private', 1946, 93, 'https://www.bmsce.ac.in', 'KCET', NOW(), NOW()),
('M S Ramaiah Institute of Technology', 'Bangalore, Karnataka', 'Karnataka', 'Bangalore', 'Private', 1962, 94, 'https://www.msrit.edu', 'KCET', NOW(), NOW()),
('University Visvesvaraya College of Engineering', 'Bangalore, Karnataka', 'Karnataka', 'Bangalore', 'Govt', 1917, 95, 'https://www.uvce.ac.in', 'KCET', NOW(), NOW()),

-- Andhra Pradesh Colleges
('Andhra University College of Engineering', 'Visakhapatnam, Andhra Pradesh', 'Andhra Pradesh', 'Visakhapatnam', 'Govt', 1946, 96, 'https://www.andhrauniversity.edu.in', 'AP EAMCET', NOW(), NOW()),
('Jawaharlal Nehru Technological University College of Engineering', 'Anantapur', 'Anantapur, Andhra Pradesh', 'Andhra Pradesh', 'Anantapur', 'Govt', 1946, 97, 'https://www.jntua.ac.in', 'AP EAMCET', NOW(), NOW()),
('Gandhi Institute of Technology and Management', 'Visakhapatnam, Andhra Pradesh', 'Andhra Pradesh', 'Visakhapatnam', 'Private', 1997, 98, 'https://www.gitam.edu', 'AP EAMCET', NOW(), NOW()),

-- Telangana Colleges
('Jawaharlal Nehru Technological University Hyderabad', 'Hyderabad, Telangana', 'Telangana', 'Hyderabad', 'Govt', 1965, 99, 'https://www.jntuh.ac.in', 'TS EAMCET', NOW(), NOW()),
('University College of Engineering, Osmania University', 'Hyderabad, Telangana', 'Telangana', 'Hyderabad', 'Govt', 1929, 100, 'https://www.uceou.edu', 'TS EAMCET', NOW(), NOW()),
('Chaitanya Bharathi Institute of Technology', 'Hyderabad, Telangana', 'Telangana', 'Hyderabad', 'Private', 1979, 101, 'https://www.cbit.ac.in', 'TS EAMCET', NOW(), NOW()),

-- Kerala Colleges
('College of Engineering, Thiruvananthapuram', 'Thiruvananthapuram, Kerala', 'Kerala', 'Thiruvananthapuram', 'Govt', 1939, 102, 'https://www.cet.ac.in', 'KEAM', NOW(), NOW()),
('Government College of Engineering, Kannur', 'Kannur, Kerala', 'Kerala', 'Kannur', 'Govt', 1986, 103, 'https://www.geckkd.ac.in', 'KEAM', NOW(), NOW()),
('College of Engineering, Trivandrum', 'Thiruvananthapuram, Kerala', 'Kerala', 'Thiruvananthapuram', 'Govt', 1939, 104, 'https://www.cet.ac.in', 'KEAM', NOW(), NOW()),

-- Additional Colleges for Complete Coverage
('National Institute of Technology, Srinagar', 'Srinagar, Jammu and Kashmir', 'Jammu and Kashmir', 'Srinagar', 'NIT', 1960, 105, 'https://www.nitsri.ac.in', 'JEE Main', NOW(), NOW()),
('National Institute of Technology, Hamirpur', 'Hamirpur, Himachal Pradesh', 'Himachal Pradesh', 'Hamirpur', 'NIT', 1986, 106, 'https://www.nith.ac.in', 'JEE Main', NOW(), NOW()),
('National Institute of Technology, Kurukshetra', 'Kurukshetra, Haryana', 'Haryana', 'Kurukshetra', 'NIT', 1963, 107, 'https://www.nitkkr.ac.in', 'JEE Main', NOW(), NOW()),
('National Institute of Technology, Jalandhar', 'Jalandhar, Punjab', 'Punjab', 'Jalandhar', 'NIT', 1987, 108, 'https://www.nitj.ac.in', 'JEE Main', NOW(), NOW()),
('National Institute of Technology, Silchar', 'Silchar, Assam', 'Assam', 'Silchar', 'NIT', 1967, 109, 'https://www.nits.ac.in', 'JEE Main', NOW(), NOW()),

-- More Private Institutions
('Birla Institute of Technology, Mesra', 'Ranchi, Jharkhand', 'Jharkhand', 'Ranchi', 'Private', 1955, 110, 'https://www.bitmesra.ac.in', 'JEE Main', NOW(), NOW()),
('Thapar Institute of Engineering and Technology', 'Patiala, Punjab', 'Punjab', 'Patiala', 'Private', 1956, 111, 'https://www.thapar.edu', 'JEE Main', NOW(), NOW()),
('Manipal Institute of Technology', 'Manipal, Karnataka', 'Karnataka', 'Manipal', 'Private', 1957, 112, 'https://www.manipal.edu', 'JEE Main', NOW(), NOW()),
('SRM Institute of Science and Technology', 'Chennai, Tamil Nadu', 'Tamil Nadu', 'Chennai', 'Private', 1985, 113, 'https://www.srmist.edu.in', 'SRMJEEE', NOW(), NOW()),

-- Additional State Colleges
('College of Engineering, Pune', 'Pune, Maharashtra', 'Maharashtra', 'Pune', 'Govt', 1854, 114, 'https://www.coep.org.in', 'MHT-CET', NOW(), NOW()),
('Veermata Jijabai Technological Institute', 'Mumbai, Maharashtra', 'Maharashtra', 'Mumbai', 'Govt', 1887, 115, 'https://www.vjti.org.in', 'MHT-CET', NOW(), NOW()),
('Sardar Patel Institute of Technology', 'Mumbai, Maharashtra', 'Maharashtra', 'Mumbai', 'Govt', 1962, 116, 'https://www.spit.ac.in', 'MHT-CET', NOW(), NOW()),
('Delhi Technological University', 'Delhi, Delhi', 'Delhi', 'Delhi', 'Govt', 1941, 117, 'https://www.dtu.ac.in', 'JEE Main', NOW(), NOW()),
('Netaji Subhas University of Technology', 'Delhi, Delhi', 'Delhi', 'Delhi', 'Govt', 1983, 118, 'https://www.nsut.ac.in', 'JEE Main', NOW(), NOW()),
('Jadavpur University', 'Kolkata, West Bengal', 'West Bengal', 'Kolkata', 'Govt', 1955, 119, 'https://www.jadavpuruniversity.in', 'WBJEE', NOW(), NOW()),
('University of Calcutta', 'Kolkata, West Bengal', 'West Bengal', 'Kolkata', 'Govt', 1857, 120, 'https://www.caluniv.ac.in', 'WBJEE', NOW(), NOW());
