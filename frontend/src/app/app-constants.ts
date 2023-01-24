import { HttpHeaders } from "@angular/common/http";

export class AppConstants {
    public static get headerToken() {
        let header = {
            headers: new HttpHeaders({
                'content-type': 'application/json',
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            })
        };
        return header
    }
}
