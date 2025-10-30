export default async function getIngredients(name:string){
    const response = await browser.runtime.sendMessage({type: "INGREDIENTS", name: name})
    return response
}