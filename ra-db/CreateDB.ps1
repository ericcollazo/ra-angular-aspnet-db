# If you have not installed the Azure modules from the PowerShell Gallery, run the following from the CLI
# Install-Module -Name Az -AllowClobber

# Connect to Azure services (only needs to be used once per Powershell session)
# Connect-AzAccount

# The SubscriptionId in which to create these objects
$SubscriptionId = 'f8b52cce-b847-4528-b52c-4bdc8cfb78b1'

# The data center and resource name for your resources
$resourcegroupname = "ra-db-rg"
$location = "EastUS"

# The login information for the server (substitute as needed)
$adminSqlLogin = "ra-db-admin"
$password = "ComplexPassword123"

# The logical server name: Use a random value or replace with your own value (do not capitalize)
$servername = "ra-srv"

# The ip address range that you want to allow to access your server - change as appropriate
$startip = "0.0.0.0"
$endip = "255.255.255.255"

# The database name
$databasename = "ra-db"

# Set subscription 
Set-AzContext -SubscriptionId $subscriptionId 

# Create a resource group
$resourceGroup = New-AzResourceGroup -Name $resourceGroupName -Location $location

# Create a server with a system wide unique server name
$server = New-AzSqlServer -ResourceGroupName $resourceGroupName `
    -ServerName $serverName `
    -Location $location `
    -SqlAdministratorCredentials $(New-Object -TypeName System.Management.Automation.PSCredential -ArgumentList $adminSqlLogin, $(ConvertTo-SecureString -String $password -AsPlainText -Force))

# Create a server firewall rule that allows access from the specified IP range
$serverFirewallRule = New-AzSqlServerFirewallRule -ResourceGroupName $resourceGroupName `
    -ServerName $serverName `
    -FirewallRuleName "AllowedIPs" -StartIpAddress $startIp -EndIpAddress $endIp

# Create a blank database with an S0 performance level
$database = New-AzSqlDatabase  -ResourceGroupName $resourceGroupName `
    -ServerName $serverName `
    -DatabaseName $databaseName `
    -RequestedServiceObjectiveName "S0" `
    -SampleName "AdventureWorksLT"