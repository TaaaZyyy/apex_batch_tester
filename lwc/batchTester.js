import { LightningElement, track } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import executeBatch from '@salesforce/apex/XX_BatchTester.executeBatch';

export default class BatchTester extends LightningElement(LightningElement) {
    @track showSpinner = false;

    executeBatch() {
        this.showSpinner = true;

        executeBatch().then(result => {
            const event = new ShowToastEvent({
                "title": "バッチを実行しました。",
                "variant": "success"
            });
            this.dispatchEvent(event);
        }).catch(errors => {
            this.handleError(errors);
        }).finally(() => {
            this.showSpinner = false;
        });
    }


    handleError(errors) {
        // エラー処理
        console.error('Error');
        console.error(JSON.stringify(errors));
        let msgs = [];
        if (errors) {
            msgs = this.findMessages(errors);
        }
        this.showErrorToast(msgs);
    }


    showErrorToast(errors) {
        const event = new ShowToastEvent({
            "title": "エラーが発生しました",
            "variant": 'error',
            "message": errors.join('; '),
            "mode": 'sticky',
        });
        this.dispatchEvent(event);
    }


    findMessages(data) {
        let messages = [];
        JSON.parse(JSON.stringify(data), function (key, value) {
            if (key === "message") {
                messages.push(value);
            }
        });
        console.log(messages);
        return messages;
    }
}
