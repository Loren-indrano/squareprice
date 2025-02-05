import wixData from 'wix-data';
$w.onReady(()=> {
    wixData.query("Résulat estimation")
    .find()
    .then((results) => {
        if (results.items.length > 0){
            $w("#text59").text = results.items[0].result;        }
    })
})