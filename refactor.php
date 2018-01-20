class Constant {

    const STATUS_ID_1 = '1';

    const STATUS_ID_2 = '2';

    const STATUS_ID_6 = '6';

    const ERROR_TYPE_0 = '0';

    const ERROR_TYPE_1 = '1';

    const ERROR_TYPE_2 = '2';

    const ERROR_TYPE_3 = '3';

    const USER_ANDROID = '0';

    const USER_IPHONE = '1';

    const DRIVER_OFFLINE = '0';

    const DRIVER_ONLINE = '1';

    const SERVICE_CONFIRMED = 'Tu servicio ha sido confirmado!';

}

class Notifier {

    /*
        Notify user when the service is confirmed
        params: service
        returns a response
    */
    public function notify_user($service) {
        $pushMessage = Constant::SERVICE_CONFIRMED;
        $push = Push::make();

        // No uuid
        if ($service->user->uuid == '') {
            return Response::json(array('error' => Constant::ERROR_TYPE_0));
        }

        if ($service->user->type == Constant::USER_IPHONE) {
            $result = $push->ios($service->user->uuid, $pushMessage, 1, 'honk.wav', 'Open', array('serviceId' => $service->id));
        } else {
            $result = $push->android2($service->user->uuid, $pushMessage, 1, 'default', 'Open', array('serviceId' => $service->id));
        }

        return Response::json(array('error' => Constant::ERROR_TYPE_0));
    }

}

class Service {

    /*
        Update the information of the service and the driver
        params: service
        returns a response
    */
    public function update_service($service) {
        if ($service->status_id == Constant::STATUS_ID_6){
            return Response::json(array('error' => Constant::ERROR_TYPE_2));
        }

        if ($service->driver_id == NULL && $service->status_id == Constant::STATUS_ID_1){
            $driver_id = Input::get('driver_id');

            //update service and driver information
            $service = Service::update($id, array(
                        'driver_id' => $driver_id,
                        'status_id' => Constant::STATUS_ID_2
            ));
            Driver::update($driver_id, array(
                'available' => Constant::DRIVER_OFFLINE
            ));
            $driverTmp = Driver::find($driver_id);
            Service::update($id, array(
                'car_id' => $driverTmp->car_id
            ));

            $response = Notifier::notify_user($service);
        } else {
            $response = Response::json(array('error' => Constant::ERROR_TYPE_1));
        }

        return response;
    }

}

/*
  Confirms if the service was succesful
  get the service_id and driver_id using POST
  returns the response
*/
public function post_confirm() {
    $id = Input::get('service_id');
    $service = Service::find($id);

    if ($service != NULL){
        $response = Service::update_service($service);
    } else {
        $response = Response::json(array('error' => Constant::ERROR_TYPE_3));
    }

    return $response;
}