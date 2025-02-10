const sqlite3 = require('sqlite3').verbose();

// Connexion à la base de données SQLite
const db = new sqlite3.Database('./maBaseDeDonnees.sqlite', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
    if (err) {
        console.error(err.message);
    } else {
        console.log('Connecté à la base de données SQLite.');

        // Création de la table avec la colonne adresse
        db.run(`CREATE TABLE IF NOT EXISTS personnes (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nom TEXT NOT NULL,
            adresse TEXT
        )`, (err) => {
            if (err) {
                console.error(err.message);
            } else {
                console.log("Table 'personnes' créée avec succès.");

                // Insérer des données initiales avec adresses
                const personnes = [
                    { nom: 'Bob', adresse: 'Paris' },
                    { nom: 'Alice', adresse: 'Lyon' },
                    { nom: 'Charlie', adresse: 'Marseille' }
                ];

                personnes.forEach(({ nom, adresse }) => {
                    db.run(`INSERT INTO personnes (nom, adresse) VALUES (?, ?)`, [nom, adresse], (err) => {
                        if (err) {
                            console.error("Erreur lors de l'insertion :", err.message);
                        }
                    });
                });
            }
        });
    }
});

module.exports = db;
