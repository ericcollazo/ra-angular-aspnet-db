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
    public class ProductController : Controller
    {
        private readonly RaDbContext _context;

        public ProductController(RaDbContext context)
        {
            _context = context;
        }

        // GET: Product
        [HttpGet]
        public IActionResult Index()
        {
            var raDbContext = _context.Product;
            return new JsonResult(raDbContext.ToList());
        }

        // GET: Product/5
        [HttpGet("{id}")]
        public IActionResult Details(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var product = _context.Product
                .SingleOrDefault(m => m.ProductId == id);
            if (product == null)
            {
                return NotFound();
            }

            return new JsonResult(product);
        }
    }
}
