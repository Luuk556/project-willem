using CalendarBackend.Model;
using Microsoft.AspNetCore.Mvc;

namespace CalendarBackend.Controller;
[ApiController]
[Route("test")]
public class AppController : Microsoft.AspNetCore.Mvc.Controller
{
    [HttpGet("testController")]
    public string Test()
    {
        return "test";
    }
}