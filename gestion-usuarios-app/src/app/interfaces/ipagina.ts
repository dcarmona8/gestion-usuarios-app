import { IUsuario } from "./iusuario";

export interface IPagina {
    page: number;
    per_page: number;
    total: number;
    total_pages: number;
    results: IUsuario[];
}
