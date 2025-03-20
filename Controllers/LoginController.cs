using Microsoft.AspNetCore.Mvc;

namespace SignalRChatApp.Controllers
{
    public class LoginController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
