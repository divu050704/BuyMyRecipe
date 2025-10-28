interface CaptionElement {
    segs: Array<{ utf8: string }>;
}
export async function fetchCaptions(url: string) {
  const response = await fetch(url);
  return response;
}

export function cleanCaptions(captionArray: CaptionElement[]): string {
    let string = ""
    captionArray.forEach((ele) => {
        if (ele.segs) {
            ele.segs.map((captionText) => {
                string += captionText.utf8
            })
            

        }
    })
    return string
}

export async function analyseCaption(caption:string){
    const request = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/get-recipe-details`,{
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({captions: caption})
    })
    const response = await request.json()
    return response
}



