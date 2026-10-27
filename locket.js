/*
 * Script Unlock Locket Gold đầy đủ và chính xác theo cấu trúc API trả về
 */
let body = $response.body;

try {
    let obj = JSON.parse(body);

    if (obj.data) {
        // Mở khóa toàn bộ các tính năng cao cấp trong upsell_features
        if (obj.data.experiments && obj.data.experiments.upsell_features) {
            let upsell = JSON.parse(obj.data.experiments.upsell_features);
            upsell.app_icon_picker = true;
            upsell.camera_roll = true;
            upsell.camera_theme = true;
            upsell.locket_views = true;
            upsell.remove_ads = true;
            upsell.custom_widget_frames = true;
            obj.data.experiments.upsell_features = JSON.stringify(upsell);
        }

        // Chuyển toàn bộ các cờ tính năng trong feature_gates thành subscriber
        if (obj.data.experiments && obj.data.experiments.feature_gates) {
            let gates = JSON.parse(obj.data.experiments.feature_gates);
            for (let key in gates) {
                gates[key] = "subscriber";
            }
            obj.data.experiments.feature_gates = JSON.stringify(gates);
        }

        // Ép kiểu mua hàng sang trạng thái Gold
        if (obj.data.purchases_entitlement) {
            obj.data.purchases_entitlement = "Gold";
        }
    }

    body = JSON.stringify(obj);
} catch (e) {
    console.log("Locket Unlock Error: " + e);
}

$done({ body });
