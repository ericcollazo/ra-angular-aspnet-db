select
    sum(Header.TotalDue), OrderProduct.Name
from ((SalesLT.SalesOrderHeader as Header
    inner join SalesLT.SalesOrderDetail as Detail on Header.SalesOrderID = Detail.SalesOrderID)
    inner join SalesLT.Product as OrderProduct on Detail.ProductID = OrderProduct.ProductID)
group by OrderProduct.Name
order by sum(Header.TotalDue) DESC
GO