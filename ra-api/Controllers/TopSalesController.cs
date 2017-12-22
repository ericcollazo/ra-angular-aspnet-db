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
            var query = from Header in _context.SalesOrderHeader 
                join Detail in _context.SalesOrderDetail  on Header.SalesOrderId equals Detail.SalesOrderId
                join OrderProduct in _context.Product on Detail.ProductId equals OrderProduct.ProductId
                group Header by new { Header.TotalDue, OrderProduct.Name } into productGroup
                orderby productGroup.Key.TotalDue descending
                select new { Name = productGroup.Key.Name, TotalSales = productGroup.Sum(t => t.TotalDue) };

            return new JsonResult(query.ToList());
        }
    }
}
