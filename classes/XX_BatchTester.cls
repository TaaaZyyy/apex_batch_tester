public with sharing class XX_BatchTester {
    public XX_BatchTester() {}

    @AuraEnabled
    public static void executeBatch() {
        try {
            Database.executeBatch(new BT_SendingOpportunityActionAlertBatch(), 100); // ★TODO: ここにテストするバッチを記載する
        } catch (Exception e) {
            System.debug(LoggingLevel.ERROR, 'error: '      + e.getMessage());
            System.debug(LoggingLevel.ERROR, 'stacktrace: ' + e.getStackTraceString());
            throw new AuraHandledException(e.getMessage());
        }
    }
}
