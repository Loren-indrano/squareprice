/**
 * Autocomplete function declaration, do not delete
 * @param {import('./__schema__.js').Payload} options
 */
export const invoke = async ({payload}) => {
  try{
    console.log("Données du formulaire : ", payload["field:code_postal"]);
    return {status : "success", message : "données affichées"};
  }
  catch(error){
    console.error("erreur");
    return{status:"error", message:error.message};
  }
};