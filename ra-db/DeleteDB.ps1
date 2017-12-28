# Login to Azure
Login-AzureRmAccount

# The resource name for your resources
$resourcegroupname = "ra-db-rg"

# Remove resource group and it's contents
Remove-AzureRmResourceGroup -ResourceGroupName $resourcegroupname