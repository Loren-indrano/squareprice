import wixData from 'wix-data';


$w.onReady(function () {
    $w("#button70").onClick(() => {
        // Récupérer la valeur saisie par l'utilisateur
        const type_bien  = $w("#dropdown1").value;
        const type_voie = $w("#dropdown2").value;
        const num_voie = parseInt($w("#input4").value);
        const nomVoie = ($w("#dropdown2").value +' '+  $w("#input1").value);
        const surface = parseInt( $w("#input2").value);
        const jardin = $w("#radioGroup1").value;
        const surface_jardin = parseInt($w("#input5").value);
        const terrasse = $w("#radioGroup2").value;
        const surface_terrasse = parseInt($w("#input6").value);
        const annee_construction = $w("#radioGroup7").value;
        const type_chauffage = $w("#radioGroup6").value;
        const isolation = $w("#radioGroup5").value;
        const meuble = $w("#radioGroup3").value;
        const etage = $w("#dropdown4").value;
        const places_parking = $w("#dropdown5").value;
        const etat = $w("#dropdown6").value;
        const exposition = $w("#radioGroup4").value;
        const services = $w("#checkboxGroup7").value;
        const equipements = $w("#checkboxGroup4").value;
        const type_mobilier = $w("#dropdown7").value;
       
        console.log(equipements);
                
        
            // Rechercher dans la collection
            wixData.query("Import405") 
                .contains("adresse_nom_voie", nomVoie)
                .contains("type_local", type_bien)
                .find()
                .then((results) => {

                    if (results.items.length > 0) {

                        let SommePrixM2 = 0;
                        let prixM2 = 0;
                        let prix = 0;
                        let prix_final = 0;
                        
                        let prixTerrasse = 0;
                        let prixJardin = 0;
                        let facteurAnciennete = 0;
                        let facteurChauffage = 0;
                        let facteurIsolation = 0;
                        let facteurMobilier = 0;
                        let facteurEtage = 0;
                        let facteurEtat = 0;
                        let facteurParking = 0;
                        let facteurExposition = 0;
                        let facteurServices = 0;
                        let facteurEquipements = 0;
                        let a = false;
                        

                        results.items.forEach(item => {
                            prixM2 = (parseInt(item.valeur_fonciere)/parseInt(item.surface_reelle_bati));
                            console.log("valeur fonc : ", parseInt(item.valeur_fonciere));
                            console.log("surface : ", parseInt(item.surface_reelle_bati));

                            console.log("prix item : ", prixM2);
                            SommePrixM2 += prixM2;
                            console.log("somme inter : ", SommePrixM2);
                        });
                        console.log("somme : ", SommePrixM2);
                        const prixMoyenM2 = (SommePrixM2/ results.items.length);
                        console.log("nombre occ ", results.items.length);
                        console.log("prix moyen m2 : ", prixMoyenM2);
                        prix = prixMoyenM2 * surface;

                        if(type_voie == "CRS"){
                            if(num_voie < 10){
                                prix=prix*1,2;
                            }
                            else{
                                if(num_voie > 10 && num_voie < 30){
                                    prix=prix*0,9;
                                }
                                else{
                                    prix=prix*0,7
                                }
                            }
                        }
                        console.log("prix : ", prix);



                        if(jardin == 'oui' && surface_jardin > 0){
                            prixJardin = (0.2*prixMoyenM2)*surface_jardin;
                        }
                        console.log("prix du jardin : ", prixJardin);

                        if(terrasse == 'oui' && surface_terrasse > 0){
                            prixTerrasse= 410*surface_terrasse;
                        }
                        console.log("prix de la terrasse : ", prixTerrasse);

                        if (annee_construction == '2000 et supérieur'){
                            facteurAnciennete = prix * 0.1;
                        }
                        else{
                            if(annee_construction == '1974 et antérieur'){
                                facteurAnciennete = -(prix * 0.1);
                            }
                        }
                        console.log("Ancienneté : ", facteurAnciennete);

                        if (type_chauffage == 'électrique'){facteurChauffage = prix * 0.005;}
                        else {
                            if (type_chauffage == 'réversible'){facteurChauffage = prix * 0.01;}
                            else{facteurChauffage= prix * 0.003;}
                        }
                        console.log("Chauffage : ", facteurChauffage);
                        
                        /*Niveau d'isolation*/
                        if (isolation == "bas"){facteurIsolation = prix * 0.02;}
                        else{
                            if (isolation == "milieu"){facteurIsolation = prix * 0.06;}
                            else{facteurIsolation = prix * 0.12;}
                        }
                        console.log("Isolation : ", facteurIsolation);

                        if (meuble == "oui"){
                            if (type_mobilier == "standard"){
                                facteurMobilier = prix * 0.03;
                            }
                            else{
                                if (type_mobilier=="milieu"){
                                    facteurMobilier = prix * 0.065;
                                }
                                else{
                                    facteurMobilier = prix * 0.09;
                                }
                            }
                        }
                        console.log("Mobilier : ", facteurMobilier);
                       

                        if (etage=="Rez-de-chaussée"){
                            facteurEtage = -(prix * 0.05);
                        }
                        else{
                            if (equipements.includes("ascenseur")){
                                a = true;
                            }
                            if (etage == "dernier"){
                                if (a){
                                    facteurEtage = prix*0.15;
                                }
                                else{
                                    facteurEtage = prix*0.09;
                                }
                            }
                            else{
                                if(a){
                                    facteurEtage = prix*0.01;
                                }
                                else{
                                    facteurEtage = prix*0.07;
                                }
                            }
                        }
                        console.log("Etage : ", facteurEtage);



                        if (etat == "neuf"){
                            facteurEtat = prix*0.1;
                        }
                        else{
                            if(etat == "bon état"){
                                facteurEtat = prix*0.03;
                            }
                            else{
                                facteurEtat = -(prix*0.2);
                            }
                        }
                        console.log("Etat général : ", facteurEtat);


                        facteurParking = parseInt(places_parking)*15000;
                        console.log("Places parking : ", facteurParking);



                        if (exposition == "Nord"){facteurExposition = prix*0.01}
                        else{
                            if(exposition == "Sud"){facteurExposition = prix*0.12}
                            else{
                                if(exposition == "Est"){facteurExposition = prix*0.05}
                                else{facteurExposition = prix*0.05}
                            }
                        }
                        console.log("Exposition : ", facteurExposition);



                        if(equipements.includes("piscine")){facteurExposition = facteurExposition + prix*0.1;}
                        if(equipements.includes("jacuzzi")){facteurExposition = facteurExposition + 10000;}
                        if(equipements.includes("climatisation")){facteurExposition = facteurExposition + prix*0.03}
                        if(equipements.includes("cuisine")){facteurExposition = facteurExposition + prix*0.4;}
                        if(equipements.includes("cave")){facteurExposition = facteurExposition + 10000;}
                        if(equipements.includes("grenier")){facteurExposition = facteurExposition + 10000;}
                        console.log("Equipements : ", facteurExposition);


                        if(services.includes("gardiennage")){facteurServices=facteurServices+prix*0.02;}
                        if(services.includes("entrée sécurisée")){facteurServices=facteurServices+prix*0.005;}
                        if(services.includes("entretien des espaces communs")){facteurServices=facteurServices+prix*0.001;}
                        console.log("Services : ", facteurServices);



                        prix_final = prix + prixJardin + prixTerrasse + facteurAnciennete + facteurChauffage + facteurIsolation + facteurMobilier + facteurEtage + facteurParking + facteurExposition + facteurServices;

                        




                        console.log("Votre bien est estimé à  : ", prix_final);
                        prix_final.toLocaleString('fr-FR', { minimumFractionDigits: 0, maximumFractionDigits: 2 });
                        $w("#text59").text = `Notre estimation pour votre bien : ${prix_final.toFixed(0)} euros`;
                       



                    } else {
                        console.log("Aucune occurrence trouvée.");
                        $w("#text59").text = "Aucune donnée de secteur recensée.";
                    }
                })
                .catch((err) => {
                    console.error("Erreur lors de la requête : ", err);
                });
    });
});


