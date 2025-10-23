export declare class CreateEmergencyReportDto {
    id: string;
    type: string;
    severity: string;
    description: string;
    media: string[];
    lat: number;
    lng: number;
    district: string;
    reported_by: string;
    status: string;
    assigned_to: string[];
}
