export default async function getRecipe(){
    const response = await browser.runtime.sendMessage({type: "START"})
    return response.analysis
}