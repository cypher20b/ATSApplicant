export interface ResCountryResponse {
    flags: {
            png: string,
            svg: string,
            alt: string
            },
    name: {
            common: string,
            official: string,
            nativeName: {
            ron: {[key:string]:string}
            }
        },
    idd: {
            root: string,
            suffixes: string[]
        }
        
}
