const express = require('express');
const session = require('express-session');
const Keycloak = require('keycloak-connect');
const db = require('./database');

const app = express();
app.use(express.json());

const PORT = 3000;

// 🔹 Configuration de la session pour Keycloak
const memoryStore = new session.MemoryStore();
app.use(session({
    secret: 'api-secret',
    resave: false,
    saveUninitialized: true,
    store: memoryStore
}));

// 🔹 Initialisation de Keycloak
const keycloak = new Keycloak({ store: memoryStore }, './keycloak-config.json');
app.use(keycloak.middleware());

app.get('/', (req, res) => {
    res.json({ message: "Registre de personnes! Choisissez le bon routage!" });
});

// 🔹 Récupérer toutes les personnes (PROTÉGÉ)
app.get('/personnes', keycloak.protect(), (req, res) => {
    db.all("SELECT * FROM personnes", [], (err, rows) => {
        if (err) {
            return res.status(400).json({ error: err.message });
        }
        res.json({ message: "success", data: rows });
    });
});

// 🔹 Récupérer une personne par ID (PROTÉGÉ)
app.get('/personnes/:id', keycloak.protect(), (req, res) => {
    const id = parseInt(req.params.id, 10);
    db.get("SELECT * FROM personnes WHERE id = ?", [id], (err, row) => {
        if (err) {
            return res.status(400).json({ error: err.message });
        }
        if (!row) {
            return res.status(404).json({ message: "Personne non trouvée" });
        }
        res.json({ message: "success", data: row });
    });
});

// 🔹 Ajouter une personne (PROTÉGÉ)
app.post('/personnes', keycloak.protect(), (req, res) => {
    const { nom, adresse } = req.body;
    if (!nom || !adresse) {
        return res.status(400).json({ error: "Le nom et l'adresse sont requis" });
    }

    db.run(`INSERT INTO personnes (nom, adresse) VALUES (?, ?)`, [nom, adresse], function (err) {
        if (err) {
            return res.status(400).json({ error: err.message });
        }
        res.json({ message: "success", data: { id: this.lastID, nom, adresse } });
    });
});

// 🔹 Mettre à jour une personne (PROTÉGÉ)
app.put('/personnes/:id', keycloak.protect(), (req, res) => {
    const id = parseInt(req.params.id, 10);
    const { nom, adresse } = req.body;

    if (!nom || !adresse) {
        return res.status(400).json({ error: "Le nom et l'adresse sont requis" });
    }

    db.run(`UPDATE personnes SET nom = ?, adresse = ? WHERE id = ?`, [nom, adresse, id], function (err) {
        if (err) {
            return res.status(400).json({ error: err.message });
        }
        if (this.changes === 0) {
            return res.status(404).json({ message: "Personne non trouvée" });
        }
        res.json({ message: "success" });
    });
});

// 🔹 Supprimer une personne (PROTÉGÉ)
app.delete('/personnes/:id', keycloak.protect(), (req, res) => {
    const id = parseInt(req.params.id, 10);
    db.run(`DELETE FROM personnes WHERE id = ?`, id, function (err) {
        if (err) {
            return res.status(400).json({ error: err.message });
        }
        if (this.changes === 0) {
            return res.status(404).json({ message: "Personne non trouvée" });
        }
        res.json({ message: "success" });
    });
});

// 🔹 Route sécurisée de test
app.get('/secure', keycloak.protect(), (req, res) => {
    res.json({ message: "Vous êtes authentifié avec Keycloak !" });
});

// 🔹 Démarrer le serveur
app.listen(PORT, () => {
    console.log(`✅ Serveur démarré sur le port ${PORT}`);
});
