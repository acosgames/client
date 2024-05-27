import { useToast } from "@chakra-ui/react";
import { useEffect } from "react";
import { useBucket } from "../actions/bucket";
import { btNotif } from "../actions/buckets";

export function notif({
    status,
    variant,
    title,
    description,
    isCloseable,
    position,
    duration,
}) {
    btNotif.set({
        status,
        variant,
        title,
        description,
        isCloseable,
        position: position || "bottom-right",
        duration: typeof duration !== "undefined" ? duration : 8000,
    });
}

export function ToastMessage({}) {
    let msg = useBucket(btNotif);
    const toast = useToast();

    useEffect(() => {
        let msgCurrent = btNotif.get();
        if (!msgCurrent?.title && !msgCurrent?.description) return;
        toast({
            ...msgCurrent,
        });
    });

    return <></>;
}
