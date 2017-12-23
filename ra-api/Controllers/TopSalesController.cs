using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using ra_api.Models;

namespace ra_api.Controllers
{
    [Route("api/[controller]")]
    public class TopSalesController : Controller
    {
        private readonly RaDbContext _context;

        public TopSalesController(RaDbContext context)
        {
            _context = context;
        }
        // GET: TopSales
        [HttpGet]
        public IActionResult Index()
        {
            var query = from x in
                (from Header in _context.SalesOrderHeader 
                join Detail in _context.SalesOrderDetail  on Header.SalesOrderId equals Detail.SalesOrderId
                group Detail by new { Detail.ProductId } into productGroup
                select new { productGroup.Key, TotalSales = productGroup.Sum(s => s.OrderQty * s.UnitPrice) })
                join OrderProduct in _context.Product on x.Key.ProductId equals OrderProduct.ProductId
                orderby x.TotalSales descending
                select new { ProductId = OrderProduct.ProductId, Name = OrderProduct.Name, TotalSales = x.TotalSales };

            return new JsonResult(query.ToList());
        }
    }
}
