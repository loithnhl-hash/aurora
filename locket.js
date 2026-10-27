let body = $response.body;
try {
    let obj = JSON.parse(body);
    if (obj.data && obj.data.experiments) {
        if (obj.data.experiments.upsell_features) {
            let upsell = JSON.parse(obj.data.experiments.upsell_features);
            upsell.app_icon_picker = true;
            upsell.camera_roll = true;
            upsell.camera_theme = true;
            upsell.locket_views = true;
            upsell.remove_ads = true;
            upsell.custom_widget_frames = true;
            obj.data.experiments.upsell_features = JSON.stringify(upsell);
        }
        if (obj.data.experiments.feature_gates) {
            let gates = JSON.parse(obj.data.experiments.feature_gates);
            for (let key in gates) { gates[key] = "subscriber"; }
            obj.data.experiments.feature_gates = JSON.stringify(gates);
        }
    }
    body = JSON.stringify(obj);
} catch (e) {}
$done({ body });