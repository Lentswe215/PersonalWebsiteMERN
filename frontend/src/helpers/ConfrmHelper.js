import { confirmAlert } from "react-confirm-alert"
import { Button, Card, CardBody, CardFooter } from "reactstrap"

export const ConfirmHelper = (Title, Content, callback) => {
    confirmAlert({
        customUI: ({ onClose }) => {
            return (
                <Card>
                    <CardBody>
                        <h3>{Title}</h3>
                        <p>
                            Are you sure you want to delete {Content}?
                        </p>
                    </CardBody>
                    <CardFooter className="text-center justify-space-between">
                        <Button color="primary" className="mx-1" size="sm" onClick={(e) => {
                            e.preventDefault();
                            if (callback)
                                callback();
                            onClose();
                        }}>Yes</Button>
                        <Button color="secondary" className="mx-1" size="sm" onClick={onClose}>NO</Button>
                    </CardFooter>
                </Card>
            )
        }
    })
}