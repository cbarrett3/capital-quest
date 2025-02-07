export interface Country {
    id: string;
    name: string;
    capitalCity: string;
    region: { value: string };
    incomeLevel: { value: string };
    lendingType: { value: string };
    longitude?: string;
    latitude?: string;
}

export type CardProps = {
    country: Country;
    index: number;
    onClick: () => void;
}
