# Connect to Azure services (only needs to be used once per Powershell session)
# Connect-AzAccount

# The resource name for your resources
$resourcegroupname = "ra-db-rg"

# Remove resource group and it's contents
Remove-AzResourceGroup -ResourceGroupName $resourcegroupname