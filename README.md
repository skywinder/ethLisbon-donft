ssh -i do_ethlisbon pe4enable@104.197.250.113

curl -X POST -H "Content-Type: application/json" -d '{    "origianlUrl": "https://www.imgacademy.com/sites/default/files/2009-stadium-about.jpg",
    "modificatorUrl": "https://www.imgacademy.com/sites/default/files/2009-stadium-about.jpg"
}' http://localhost:5000/applyModification