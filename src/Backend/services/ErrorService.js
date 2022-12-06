class APIError {
    status;
    message;
    description;

    constructor(message, status = 500, description = null){
        this.status = status;
        this.message = message;
        this.description = description;
    }

    getObjectForClient(){
        return {
            "status": this.status,
            "message": this.message
        }
    }
}

module.exports = APIError;