package main

import (
	"html/template" // render HTML templates
	"log"           // log server messages
	"net/http"      // for HTTP server
)

func main() {
	// Serve static files from /static dir
	http.Handle("/static/", http.StripPrefix("/static/", http.FileServer(http.Dir("static"))))

	// Route handler funcs
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		tmpl := template.Must(template.ParseFiles("templates/index.html"))
		tmpl.Execute(w, nil)
	})

	log.Println("Server started at http://localhost:8080")
	log.Fatal(http.ListenAndServe(":8080", nil)) // Start HTTP localhost server
}
