# If you have not installed the Azure Resource Manager modules from the PowerShell Gallery, run the following from the CLI
# Install-Module AzureRM -AllowClobber
# Import-Module AzureRM

# The data center and resource name for your resources
$resourcegroupname = "ra-db-rg"
$location = "EastUS"

# The login information for the server (substitute as needed)
$adminlogin = "ra-db-admin"
$password = "ComplexPassword123"

# The logical server name: Use a random value or replace with your own value (do not capitalize)
$servername = "ra-srv"

# The ip address range that you want to allow to access your server - change as appropriate
$startip = "0.0.0.0"
$endip = "255.255.255.255"

# The database name
$databasename = "ra-db"

# Azure subscription name
Add-AzureAccount

# Create resource group
New-AzureRmResourceGroup -Name $resourcegroupname -Location $location

# Create server
New-AzureRmSqlServer -ResourceGroupName $resourcegroupname `
-ServerName $servername `
-Location $location `
-SqlAdministratorCredentials $(New-Object -TypeName System.Management.Automation.PSCredential -ArgumentList $adminlogin, $(ConvertTo-SecureString -String $password -AsPlainText -Force))

# Create firewall rules for SQL management
New-AzureRmSqlServerFirewallRule -ResourceGroupName $resourcegroupname `
-ServerName $servername `
-FirewallRuleName "AllowSome" -StartIpAddress $startip -EndIpAddress $endip

New-AzureSqlDatabaseServerFirewallRule -ServerName $servername `
-AllowAllAzureServices

# Create sample database
New-AzureRmSqlDatabase  -ResourceGroupName $resourcegroupname `
-ServerName $servername `
-DatabaseName $databasename `
-RequestedServiceObjectiveName "S0" `
-SampleName "AdventureWorksLT"
