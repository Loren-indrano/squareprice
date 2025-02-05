import wixData from 'wix-data';


$w.onReady(function () {
    $w("#button71").onClick(() => {
        // Récupérer la valeur saisie par l'utilisateur
        const nomVoie = (($w("#dropdown1").value) + " " + ($w("#input1").value));
        console.log(nomVoie);
        
            // Rechercher dans la collection
            wixData.query("Import405") 
                .contains("adresse_nom_voie", nomVoie)
                .find()
                .then((results) => {
                    if (results.items.length > 0) {
                        $w("#text61").text = `Votre adresse est éligible`;
                    }
                    else{
                        $w("#text61").text = `Malheuresement, votre adresse n'est pas encore éligible`;
                    }
                });
    });
});