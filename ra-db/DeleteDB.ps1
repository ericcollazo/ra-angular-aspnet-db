# Azure subscription name
Add-AzureAccount

# The resource name for your resources
$resourcegroupname = "ra-db-rg"

# Remove resource group and it's contents
Remove-AzureRmResourceGroup -ResourceGroupName $resourcegroupname