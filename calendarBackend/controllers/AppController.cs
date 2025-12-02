using CalendarBackend.Model;
using Microsoft.AspNetCore.Mvc;

namespace CalendarBackend.Controllers;
[ApiController]
[Route("test")]
public class AppController : Controller
{
    [HttpGet("testController")]
    public string Test()
    {
        return "test";
    }
}