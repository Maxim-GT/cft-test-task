import type { RequestOtpFormData, RequestOtpApiData} from "./schema";

export interface RequestOtpFormProps {
    initialPhone?: RequestOtpFormData['phone'];
    onSuccess?: () => void;
    onSentApiPhone?: (payload: RequestOtpApiData) => void;
    onSentDisplayPhone?: (phone: string) => void;
    className?: string;
}