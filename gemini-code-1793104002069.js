/***********************************************
> Script Name: Locket Gold Unlocker
> Function: Mở khóa tất cả tính năng Locket Gold (Upload từ thư viện, xem lịch sử, không quảng cáo, v.v.)
***********************************************/

let body = $response.body;
try {
    let obj = JSON.parse(body);

    // Bật các tính năng Gold và quyền subscriber
    if (obj.data) {
        // Cấu hình lại các cờ tính năng sang trạng thái được phép (subscriber)
        if (obj.data.features) {
            let features = ["app_icon_picker", "camera_roll", "camera_theme", "locket_views", "remove_ads", "custom_widget_frames", "longer_captions", "longer_video", "profile_badge", "unlimited_friends"];
            features.forEach(f => {
                if (obj.data.features[f]) {
                    obj.data.features[f] = true;
                }
            });
        }
        
        // Ghi đè trạng thái gói cước thành Gold active
        obj.data.purchases_enabled = true;
        obj.data.purchases_entitlement = "Gold";
        
        // Kích hoạt các gate sang trạng thái subscriber
        if (obj.data.feature_gates) {
            for (let key in obj.data.feature_gates) {
                obj.data.feature_gates[key] = "subscriber";
            }
        }
    }

    $done({ body: JSON.stringify(obj) });
} catch (e) {
    // Trường hợp lỗi parse JSON thì trả về nguyên bản để tránh crash app
    $done({ body });
}